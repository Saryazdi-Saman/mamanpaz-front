import "server-only";
import { OnboardingStage } from "@/types/onboarding";

enum CredentialsError {
    EMAIL_EXISTS = "EMAIL_EXISTS",
    INVALID_PHONE_NUMBER = "INVALID_PHONE_NUMBER",
    GUEST_NOT_FOUND = "GUEST_NOT_FOUND",
    OTHER = "OTHER",
}

type AddCredentialsInput = {
    token: string;
    phoneNumber: string;
    password: string;
    email: string;
}

type CredentialsRegisterationError = {
    success: false;
    error: CredentialsError;
}

type CredentialsRegisterationSuccess = {
    success: true;
    next: OnboardingStage.VERIFY_PHONE_NUMBER | OnboardingStage.ADDRESS;
}

type CredentialsRegisterationStatus = CredentialsRegisterationError | CredentialsRegisterationSuccess;

export async function addCredentials(input: AddCredentialsInput): Promise<CredentialsRegisterationStatus> {
    const { success, error, next } = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest/${input.token}/credentials`, {
        method: "POST",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            phone_number: input.phoneNumber,
            password: input.password,
            email: input.email
        })
    }).then((res) => res.json());
    if (success) {
        return { success, next };
    } else {
        return { success, error };
    }
}

export async function requestOTPMessage(token: string): Promise<undefined> {
    try {
        await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest/${token}/otp`, {
            method: "GET",
            credentials: "include",
            headers: {
                "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            },
        })
        return
    } catch {
        return
    }
}

type VerifyOTPActionResponse = {
    success: boolean;
    error?: boolean;
}

export async function verifyOTP({
    token,
    otp
}: {
    token: string,
    otp: string
}): Promise<VerifyOTPActionResponse> {
    const response: VerifyOTPActionResponse = {
        success: false,
    }
    try {
        const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest/${token}/otp`, {
            method: "POST",
            credentials: "include",
            headers: {
                "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                otp
            })
        }).then((res) => res.json());
        if (result.success) {
            response.success = true
        } else {
            if (result.error && result.error !== "INVALID_OTP") {
                response.error = true
            }
        }
    } catch {
        response.error = true
    }
    return response
}

type CustomerInfoResponse = {
    success: boolean,
    error?: "GUEST_NOT_FOUND" | "OTHER"
}

export async function addCustomerInfo({
    guestToken,
    name,
    lastname,
    address_line1,
    address_line2,
    address_line3,
    postal_code,
    city,
    district,
    country,
    neighborhood,
    region
}: {
    guestToken: string,
    name: string,
    lastname: string,
    address_line1: string,
    address_line2: string,
    address_line3: string,
    postal_code: string,
    city: string,
    district?: string,
    country: string,
    neighborhood?: string,
    region: string
}): Promise<CustomerInfoResponse> {
    const response:CustomerInfoResponse = {
        success: false,
    }
    try {
        const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest/${guestToken}/address`, {
            method: "POST",
            credentials: "include",
            headers: {
                "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                lastname,
                address_line1,
                address_line2,
                address_line3,
                postal_code,
                city,
                district,
                country,
                neighborhood,
                region
            })
        })
        if (!result.ok) {
            response.error = "OTHER"
            return response
        }
        const data = await result.json();
        if (data.error && data.error === "GUEST_NOT_FOUND") {
            response.error = "GUEST_NOT_FOUND"
            return response
        }
        if (data.error && data.error === "OTHER") {
            response.error = "OTHER"
            return response
        }

        response.success = true
        return response
    } catch {
        response.error = "OTHER"
        return response
    }

}