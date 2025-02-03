import { z } from "zod";

export const credentialsSchema = z.object({
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

export const otpSchema = z.object({
    otp: z.string()
        .trim()
        .min(4, "pin must be 4 digits")
        .max(4, "pin must be 4 digits")
        .refine((val) => /^\d+$/.test(val), "PIN can only contain numbers"),
})

export const addressFormSchema = z.object({
    name: z.string()
        .trim()
        .toLowerCase()
        .min(2, "Too short")
        .max(50, "Too long")
        .regex(/^[a-zA-Z\s-]+$/, "May only contain letters, spaces, and hyphens"),

    lastname: z.string()
        .trim()
        .toLowerCase()
        .min(2, "Too short")
        .max(50, "Too long")
        .regex(/^[a-zA-Z\s-]+$/, "May only contain letters, spaces, and hyphens"),

    address_line1: z.string()
        .min(5, "Too short")
        .max(100, "Too long"),

    address_line2: z.string().trim().max(100, "Instructions are too long").optional().or(z.literal("")),

    address_line3: z.string().trim().max(100, "Instructions are too long").optional().or(z.literal("")),

    postal_code: z.string().trim()
        .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, "Invalid postal code format")
        .max(7, "Invalid postal code"),

    city: z.string().trim()
        .min(2, "Invalid city name")
        .max(50, "Invalid city name")
        .regex(/^[a-zA-Z\s-]+$/, "Invalid city name")
        .refine(
            (input) =>
                SERVICE_ZONE.some((location) => normalize(location) === normalize(input)),
            {
                message: "Our services are only available in GTA.",
            }
        ),
});

// Function to normalize input (removes spaces, hyphens, and underscores, then lowercases)
const normalize = (str: string) => str.replace(/[\s\-_]+/g, "").toLowerCase();

const SERVICE_ZONE = [
    "Ajax",
    "Aurora",
    "Bradford West Gwillimbury",
    "Brampton",
    "Burlington",
    "Caledon",
    "Carlington",
    "East Gwillimbury",
    "East York",
    "Etobicoke",
    "Georgina",
    "Halton Hills",
    "King City",
    "Markham",
    "Milton",
    "Mississauga",
    "New Tecumseth",
    "Newmarket",
    "North York",
    "Oakville",
    "Oshawa",
    "Pickering",
    "Richmond Hill",
    "Scarborough",
    "Scugog",
    "Thornhill",
    "Toronto",
    "Uxbridge",
    "Vaughan",
    "Whitby",
    "Whitchurch-Stouffville",
    "York",
] as const;