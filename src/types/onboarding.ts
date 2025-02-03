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

export type AddressFormData = {
    name: string;
    lastname: string;
    address_line1: string;
    address_line2: string;
    address_line3: string;
    postal_code: string;
    city: string;
    district: string;
    country: string;
    neighborhood: string;
    region: string;
}

export type AddressFormResponse = {
    errors?: {
        [K in keyof AddressFormData]?: string[];
    } & {
        other?: RegistrationError; 
    }
    inputs?: Partial<AddressFormData>;
}

export enum OnboardingStage {
    INITIAL = "initial",
    CREDENTIALS = "credentials",
    VERIFY_PHONE_NUMBER = "verify_phone_number",
    ADDRESS = "address",
    PAYMENT = "payment",
    COMPLETE = "complete",
}

export type Guest = {
    email: string;
    phone_number: string;
    name?:string;
    last_name?:string;
    address_line1?:string;
    city?:string;
    postal_code?:string;
}
