'use server'

import { z } from "zod";
import { AddressFormData, AddressFormResponse, CredentialsActionResponse, CredentialsFormData, OnboardingStage, OTPActionResponse, RegistrationError } from "@/types/onboarding";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addCredentials, requestOTPMessage, verifyOTP } from "../db/guest-account";
import { setGuestCookies } from "./guest";
import { createGuest } from "../db/guest-queries";
import { addressFormSchema, credentialsSchema, otpSchema } from "../validators";

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

export async function submitAddressForm(
    prevState: AddressFormResponse | null,
    formData: FormData
): Promise<AddressFormResponse> {
    const cookieStore = await cookies()
    const guestToken = cookieStore.get("guest_session")?.value;
    
    if (!guestToken || guestToken === "") {
        redirect("/pricing")
    }
    
    const rawData: AddressFormData = {
        name: formData.get("name") as string,
        lastname: formData.get("lastname") as string,
        address_line1: formData.get("address_line1") as string,
        address_line2: formData.get("address_line2") as string,
        address_line3: formData.get("address_line3") as string,
        postal_code: formData.get("postal_code") as string,
        city: formData.get("city") as string,
        district: formData.get("district") as string,
        country: formData.get("country") as string,
        neighborhood: formData.get("neighborhood") as string,
        region: formData.get("region") as string,
    }
    const response: AddressFormResponse = {
        inputs: rawData
    }
    
    const validatedData = addressFormSchema.safeParse(rawData);
    console.log("validatedData", validatedData.data)
    console.log(validatedData.error?.flatten().fieldErrors)
    if (!validatedData.success) {
        response.errors = validatedData.error.flatten().fieldErrors;
        return response;
    }

    const geocodingResponse = await fetch(`${process.env.MAPBOX_GEOCODING_ENDPOINT}`
        + "country=ca"
        + `&address_line1=${validatedData.data.address_line1}`
        + `&place=${validatedData.data.city}`
        + `&region=${rawData.region}`
        + `&postcode=${rawData.postal_code}`
        + "&limit=1"
        + '&types=address'
        + `&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`)

    const geocodingData = await geocodingResponse.json();

    if (geocodingData.features.length === 0) {
        response.errors = {
            address_line1: ["Invalid address"]
        }
        return response;
    }

    const geocodingMatchCode = geocodingData.features[0].properties.match_code;
    if (geocodingMatchCode.confidence !== "exact") {
        response.errors = {
            address_line1: ["Invalid address"]
        }
        return response;
    }

    redirect("/checkout/payment")
}