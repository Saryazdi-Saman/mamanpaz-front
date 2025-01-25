import { Plan } from "@/types/types";

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