import { Plan } from "@/types/types"

export function PlanSummary({
    plan,
}: {
    plan: Plan
}) {
    return (
        <div
            className="col-start-3 row-start-1 col-span-full row-span-full justify-self-center"
        >
            <dl className="space-y-1">
                <dt className="text-lg leading-tight font-semibold">
                    {plan.name}
                </dt>
                <div className="grid grid-cols-[auto_auto] grid-rows-[1fr_1fr_2fr] items-start justify-items-end gap-x-2 sm:gap-x-6 gap-y-1">
                    <dd className="justify-self-start">meals per week</dd>
                    <dd className="">{plan.meals_per_week}</dd>
                    <dd className="justify-self-start self-start">price per meal</dd>
                    <div className="flex flex-col items-end">
                        <dd>${plan.price_per_meal}</dd>
                    </div>
                </div>
            </dl>
        </div>
    )
}