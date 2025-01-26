export interface TMenu {
    meals: TMeal[],
}

export type TMeal = {
    src: string,
    title: string,
    subtitle?: string,
    description?: string,
    price: number,
    alt: string,
}

export type Guest = {
    id: string,
    daily_meals: number,
    weekly_meals: number,
    delivery: "biweekly" | "triweekly" | "daily",
    phone_number: string,
    phone_verified: boolean,
    email: string,
    email_verified: boolean,
    password: string,
    name: string,
    last_name: string,
    address: string,
    city: string,
    token: string,
}

// export type Session = {
//     user?: string;
//     guest?: Guest;
// }

export type Plan = {
    id: string,
    name: string,
    price_per_meal: number,
    meals_per_week: number,
    meals_per_day: number,
    product_variant: {
        id: string,
    }
}

export type DeliverySchedule = {
    id: string,
    name: string,
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number,
    price: number,
    product_variant: {
        id: string,
    }
}

