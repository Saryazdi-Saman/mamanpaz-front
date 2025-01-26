import { PlanSelector } from "./planSelector";
import { Plan } from "@/types/types";
import { PlanSummary } from "./planSummary";

export default async function PlanOptions({
    plans,
    selectedPlan,
    selectesDelivery
}: {
    plans: Plan[]
    selectedPlan: string | string[]
    selectesDelivery: string | string[]
}) {
    return (
        <section className="bg-background py-10 sm:px-14 grow select-none">
            <h3 className="text-xl md:text-2xl font-bold select-none py-4">2. Select number of meals</h3>
            <div className="flex gap-6">
                <div
                    className="grid grid-cols-2 gap-1 w-fit">
                    {plans.map((plan) => (
                        <PlanSelector key={plan.id} plan={plan} selectedPlan={selectedPlan} selectesDelivery={selectesDelivery} />
                    ))}
                </div>
                <PlanSummary plan={plans.find((plan) => plan.slug === selectedPlan) ?? plans[0]} />
            </div>
        </section>
    )
}