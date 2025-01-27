import ScheduleSelector from "@/components/onboarding/pricing/deliveryOptionSelector";
import { Button } from "@/components/ui/button";
import { DeliverySchedule } from "@/types/types";
import { DeliverySummary } from "./deliverySummary";
import { AddToCartButton } from "./addToCartButton";

export default async function DeliveryScheduleOptions({
    plans,
    selectedPlan,
    selectedDelivery,
    multiplier
}: {
    plans: DeliverySchedule[],
    selectedPlan: string | string[],
    selectedDelivery: string | string[],
    multiplier: number
}) {
    return (
        <section className="bg-background py-10 px-4 sm:px-14">
            <h3 className="text-xl md:text-2xl font-bold select-none py-4">3. Choose your delivery preference</h3>
            <div className="flex flex-row justify-between gap-8">
                <div className="options flex flex-col gap-4">
                    {plans.map((option) => (
                        <ScheduleSelector
                            key={option.id}
                            schedule={option}
                            selectedDelivery={selectedDelivery}
                            selectedPlan={selectedPlan}
                        />
                    ))}
                </div>
                <DeliverySummary
                    schedule={plans.find((plan) => plan.slug === selectedDelivery) ?? plans[0]}
                    multiplier={multiplier}
                />
            </div>
            <AddToCartButton />
        </section>
    )
}