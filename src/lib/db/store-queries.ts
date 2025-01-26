import { DeliverySchedule, Plan } from "@/types/types";

export async function getAvailablePlans(): Promise<Plan[]> {
    
    const { plans } = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/plans`, {
        method: "GET",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
        },
        next: {
            tags: ['available_plans']
        }
    }).then((res) => res.json());
    return plans;
}

export async function getAvailableDeliveryOptions(): Promise<DeliverySchedule[]> {
    const { delivery_options } = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/delivery-options`, {
        method: "GET",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
        },
        next: {
            tags: ['delivery_options']
        }
    }).then((res) => res.json());
    return delivery_options;
}