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