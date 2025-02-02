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
    email: z.string()
        .trim()
        .toLowerCase()
        .email(),

    phoneNumber: z.string()
        .trim()
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits")
        .refine((val) => /^\d+$/.test(val), "Phone number can only contain numbers"),

    password: z.string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters"),
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

    const response: CredentialsActionResponse = {
        hasChanged: true,
        inputs: rawData,
    }

    const hasSameValue = (
        prevState?.inputs?.phoneNumber === rawData.phoneNumber &&
        prevState?.inputs?.email === rawData.email &&
        prevState?.inputs?.password === rawData.password
    )

    if (hasSameValue) {
        response.success = prevState?.success;
        response.errors = prevState?.errors;
        response.hasChanged = false;
        return response;
    }

    //validate the data
    const validatedData = credentialsSchema.safeParse(rawData);
    if (!validatedData.success) {
        response.errors = validatedData.error.flatten().fieldErrors;
        return response;
    }

    try {
        const phoneNumberUtil = PhoneNumberUtil.getInstance();
        const numberObject = phoneNumberUtil.parseAndKeepRawInput(validatedData.data.phoneNumber, 'CA')
        const intlNumber = phoneNumberUtil.format(numberObject, PhoneNumberFormat.E164)
        const isValid = phoneNumberUtil.isValidNumber(numberObject)

        if (!isValid) {
            response.errors = { phoneNumber: ["Invalid phone number"] };
            return response;
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
                    response.errors = {
                        other: RegistrationError.EMAIL_EXISTS,
                    };

                case "INVALID_PHONE_NUMBER":
                    response.errors = { phoneNumber: ["Invalid phone number"] };

                case "GUEST_NOT_FOUND":
                    const { guest_token, cart_id } = await createGuest();
                    await setGuestCookies({
                        guest_token,
                        cart_id,
                        progress_step: OnboardingStage.INITIAL
                    })
                    response.errors = { other: RegistrationError.GUEST_NOT_FOUND };

                case "OTHER":
                    response.errors = { other: RegistrationError.SERVER_ERROR };
                    
                default:
                    response.errors = { other: RegistrationError.SERVER_ERROR };
            }
        } else {
            if (result.next === OnboardingStage.ADDRESS) {
                await setGuestCookies({
                    progress_step: OnboardingStage.ADDRESS
                })
                response.success = {
                    next: OnboardingStage.ADDRESS
                };
            } else {
                await setGuestCookies({
                    progress_step: OnboardingStage.VERIFY_PHONE_NUMBER
                })
                response.success = {
                    next: OnboardingStage.VERIFY_PHONE_NUMBER
                };
            }
        }
    } catch {
        response.errors = { other: RegistrationError.SERVER_ERROR };
    } finally {
        if (response.success && response.success.next === OnboardingStage.ADDRESS) {
            redirect("/checkout/details")
        }
        if (response.errors && response.errors.other === RegistrationError.GUEST_NOT_FOUND) {
            redirect("/pricing")
        }
        return response;
    }
}

const otpSchema = z.object({
    otp: z.string()
        .trim()
        .min(4, "pin must be 4 digits")
        .max(4, "pin must be 4 digits")
        .refine((val) => /^\d+$/.test(val), "PIN can only contain numbers"),
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