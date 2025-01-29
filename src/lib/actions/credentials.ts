'use server'

import { z } from "zod";
import { CredentialsActionResponse, CredentialsFormData, OnboardingStage } from "@/types/onboarding";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { addCredentials } from "../db/guest-account";
import { setGuestCookies } from "./guest";

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

    //validate the data
    const validatedData = credentialsSchema.safeParse(rawData);
    if (!validatedData.success) {
        return {
            success: false,
            message: "Please fix the errors in the form",
            errors: validatedData.error.flatten().fieldErrors,
            inputs: rawData,
        }
    }

    let nextStep: OnboardingStage = OnboardingStage.CREDENTIALS

    try {
        const phoneNumberUtil = PhoneNumberUtil.getInstance();
        const numberObject = phoneNumberUtil.parseAndKeepRawInput(validatedData.data.phoneNumber, 'CA')
        const intlNumber = phoneNumberUtil.format(numberObject, PhoneNumberFormat.E164)
        const isValid = phoneNumberUtil.isValidNumber(numberObject)

        if (!isValid) {
            return {
                success: false,
                message: "Please fix the errors in the form",
                errors: { phoneNumber: ["Invalid phone number"] },
                inputs: rawData,
            }
        }

        const result = await addCredentials({
            token: guestToken,
            phoneNumber: intlNumber,
            password: validatedData.data.password,
            email: validatedData.data.email,
        })

        console.log("DB QUERY RESULT:", result)

        if (result.error) {
            switch (result.error) {
                case "EMAIL_EXISTS":
                    return {
                        success: false,
                        message: "Email address is already registered",
                        inputs: rawData,
                    }
                case "INVALID_PHONE_NUMBER":
                    return {
                        success: false,
                        message: "Invalid phone number",
                        inputs: rawData,
                    }
                case "GUEST_NOT_FOUND":
                    return {
                        success: false,
                        message: "Guest not found",
                        inputs: rawData,
                    }
            }
        }
        if (result?.next === OnboardingStage.ADDRESS) {
            await setGuestCookies({
                progress_step: OnboardingStage.ADDRESS
            })
            nextStep = OnboardingStage.ADDRESS
        }

        if (result.next === OnboardingStage.VERIFY_PHONE_NUMBER) {
            await setGuestCookies({
                progress_step: OnboardingStage.VERIFY_PHONE_NUMBER
            })
            nextStep = OnboardingStage.VERIFY_PHONE_NUMBER
        }
    } catch (error) {
        if (error) {
            return {
                success: false,
                message: "Something went wrong",
            }
        }
    }

    if (nextStep === OnboardingStage.VERIFY_PHONE_NUMBER) {
        redirect("/verify-phone-number")
    } else if (nextStep === OnboardingStage.ADDRESS) {
        redirect("/delivery-info")
    } else {
        return {
            success: false,
            message: "Something went wrong",
        }
    }
}