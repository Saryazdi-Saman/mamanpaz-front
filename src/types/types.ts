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

export type Plan = {
    id: string,
    name: string,
    slug: string,
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
    slug: string,
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

export type AddressAutocomplete = {
    name: string,
    context: {
        address: {
            address_number: string,
            name: string,
            street_name: string,
        },
        country: {
            country_code: string,
            name: string,
        },
        district?: {
            name: string,
        },
        neighborhood?: {
            name: string,
        },
        place: {
            name: string,
        },
        postcode: {
            name: string,
        },
        region: {
            name: string,
            region_code: string,
        },
        street: {
            name: string,
        },
    }
    full_address?: string,
}
