export type CredentialsFormData = {
    email: string;
    phoneNumber: string;
    password: string;
}

export enum RegistrationError {
    EMAIL_EXISTS = "EMAIL_EXISTS",
    SERVER_ERROR = "SERVER_ERROR",
    GUEST_NOT_FOUND = "GUEST_NOT_FOUND",
}

export type AddToCartInput = {
    meal_plan_variant: string;
    delivery_schedule_variant: string;
}

export interface CredentialsActionResponse {
    // success: boolean;
    success?: {
        next: OnboardingStage.VERIFY_PHONE_NUMBER | OnboardingStage.ADDRESS;
    };
    errors?: {
        [K in keyof CredentialsFormData]?: string[];
    } & {
        other?: RegistrationError;
    }
    inputs?: Partial<CredentialsFormData>;
    hasChanged: boolean;
}

export type OTPActionResponse = {
    success: boolean;
    error?: string;
}

export enum OnboardingStage {
    INITIAL = "initial",
    CREDENTIALS = "credentials",
    VERIFY_PHONE_NUMBER = "verify_phone_number",
    ADDRESS = "address",
    PAYMENT = "payment",
    COMPLETE = "complete",
}
