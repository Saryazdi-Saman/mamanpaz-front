export type CredentialsFormData = {
    email: string;
    phoneNumber: string;
    password: string;
}

export type AddToCartInput = {
    meal_plan_variant: string;
    delivery_schedule_variant: string;
}

export interface CredentialsActionResponse {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof CredentialsFormData]?: string[];
    }
    inputs?: Partial<CredentialsFormData>;
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
