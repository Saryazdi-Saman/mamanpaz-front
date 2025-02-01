'use server'

import { z } from "zod";
import { CredentialsActionResponse, CredentialsFormData, OnboardingStage, OTPActionResponse, RegistrationError } from "@/types/onboarding";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addCredentials, requestOTPMessage, verifyOTP } from "../db/guest-account";
import { setGuestCookies } from "./guest";
import { createGuest } from "../db/guest-queries";

const credentialsSchema = z.object({
    email: z.string().trim().email(),
    phoneNumber: z.string().trim().min(10, "Invalid phone number").max(10, "Invalid phone number"),
    password: z.string().trim().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters"),
})

export async function submitCredentials(
    prevState: CredentialsActionResponse | null,
    formData: FormData
): Promise<CredentialsActionResponse> {

    const cookieStore = await cookies()
    const guestToken = cookieStore.get("guest_session")?.value;

    if (!guestToken || guestToken === "") {
        redirect("/pricing")
    }

    const rawData: CredentialsFormData = {
        email: formData.get("email") as string,
        phoneNumber: formData.get("phone_number") as string,
        password: formData.get("password") as string,
    }

    const hasSameValue = (
        prevState?.inputs?.phoneNumber === rawData.phoneNumber &&
        prevState?.inputs?.email === rawData.email &&
        prevState?.inputs?.password === rawData.password
    )

    if (hasSameValue) {
        console.log("Credentials form data is unchanged")
        return {
            success: prevState?.success,
            inputs: rawData,
            errors: prevState?.errors,
            hasChanged: false,
        };
    }
    //validate the data
    const validatedData = credentialsSchema.safeParse(rawData);
    if (!validatedData.success) {
        return {
            success: false,
            errors: validatedData.error.flatten().fieldErrors,
            inputs: rawData,
            hasChanged: true,
        }
    }

    try {
        const phoneNumberUtil = PhoneNumberUtil.getInstance();
        const numberObject = phoneNumberUtil.parseAndKeepRawInput(validatedData.data.phoneNumber, 'CA')
        const intlNumber = phoneNumberUtil.format(numberObject, PhoneNumberFormat.E164)
        const isValid = phoneNumberUtil.isValidNumber(numberObject)

        if (!isValid) {
            console.log("Invalid phone number")
            console.log(rawData)
            return {
                success: false,
                errors: { phoneNumber: ["Invalid phone number"] },
                inputs: {
                    ...rawData,
                },
                hasChanged: true,
            }
        }

        const result = await addCredentials({
            token: guestToken,
            phoneNumber: intlNumber,
            password: validatedData.data.password,
            email: validatedData.data.email,
        })

        if (!result.success) {
            switch (result.error) {
                case "EMAIL_EXISTS":
                    return {
                        success: false,
                        errors: {
                            other: RegistrationError.EMAIL_EXISTS,
                        },
                        inputs: rawData,
                        hasChanged: true,
                    }

                case "INVALID_PHONE_NUMBER":
                    return {
                        success: false,
                        errors: { phoneNumber: ["Invalid phone number"] },
                        inputs: rawData,
                        hasChanged: true,
                    }

                case "GUEST_NOT_FOUND":
                    const { guest_token, cart_id } = await createGuest();
                    await setGuestCookies({
                        guest_token,
                        cart_id,
                        progress_step: OnboardingStage.ADDRESS
                    })
                    redirect("/pricing")

                case "OTHER":
                    return {
                        success: false,
                        errors: { other: RegistrationError.SERVER_ERROR },
                        inputs: rawData,
                        hasChanged: true,
                    }

                default:
                    return {
                        success: false,
                        errors: { other: RegistrationError.SERVER_ERROR },
                        inputs: rawData,
                        hasChanged: true,
                    }

            }
        } else {
            if (result.next === OnboardingStage.ADDRESS) {
                await setGuestCookies({
                    progress_step: OnboardingStage.ADDRESS
                })
                redirect("/checkout/details")
            }

            await setGuestCookies({
                progress_step: OnboardingStage.VERIFY_PHONE_NUMBER
            })
            return {
                success: true,
                inputs: rawData,
                hasChanged: true,
            }
        }
    } catch {
        return {
            success: false,
            errors: { other: RegistrationError.SERVER_ERROR },
            inputs: rawData,
            hasChanged: true,
        }
    }
}

const otpSchema = z.object({
    otp: z.string().trim().min(4, "pin must be 4 digits").max(4, "pin must be 4 digits"),
})
export async function submitOtp(
    input: string
): Promise<OTPActionResponse> {
    const cookieStore = await cookies()
    const guestToken = cookieStore.get("guest_session")?.value;

    if (!guestToken || guestToken === "") {
        redirect("/pricing")
    }
    const rawData: { otp: string } = {
        otp: input,
    }

    //validate the data
    const validatedData = otpSchema.safeParse(rawData);
    if (!validatedData.success) {
        return {
            success: false,
            error: "PIN must be 4 digits",
        }
    }

    const result = await verifyOTP({
        token: guestToken,
        otp: validatedData.data.otp
    })

    if (!result.success) {
        if (result.error) {
            return {
                success: false,
                error: "Something went wrong, please try again.",
            }
        } else {
            return {
                success: false,
                error: "Invalid PIN",
            }
        }
    } else {
        await setGuestCookies({
            progress_step: OnboardingStage.ADDRESS
        })
        redirect("/checkout/details")
    }
}


export async function resendOTP() {
    const cookieStore = await cookies()
    const guestToken = cookieStore.get("guest_session")?.value;

    console.log("actions/credentials.ts:resendOTP")
    console.log("guestToken", guestToken)

    if (!guestToken || guestToken === "") {
        redirect("/pricing")
    }

    await requestOTPMessage(guestToken)
    return
}