import { Plan } from "@/types/types";
import Link from "next/link";
import clsx from "clsx";

export async function PlanSelector({
    plan,
    selectedPlan,
    selectedDelivery,
}: {
    plan: Plan,
    selectedPlan: {
        slug: string | string[]
        id: string
    },
    selectedDelivery: {
        slug: string | string[]
        id: string
    }
}) {
    const isActive = plan.slug === selectedPlan.slug;
    return (
        <>
            <Link
                href={`?plan=${plan.slug}&delivery=${selectedDelivery.slug}`}
                className={clsx(
                    "flex items-center justify-center h-10 w-14 sm:w-20 border-2 transition-colors",
                    {
                        "cursor-pointer bg-background border-blue-50 text-blue-200": !isActive,
                        "cursor-default bg-blue-500 text-background border-blue-500": isActive
                    }
                )}
                scroll={false}
                replace
            >
                {plan.meals_per_day}
            </Link>
        </>
    )
}