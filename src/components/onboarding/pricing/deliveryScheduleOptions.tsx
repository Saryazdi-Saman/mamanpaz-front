import ScheduleSelector from "@/components/onboarding/pricing/deliveryOptionSelector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DeliverySchedule } from "@/types/types";
import { DeliverySummary } from "./deliverySummary";

export default async function DeliveryScheduleOptions({
    schedule
}: {
    schedule: Promise<DeliverySchedule[]>
}) {
    const deliveryOptions = await schedule;
    return (
        <section className="bg-background py-10 px-4 sm:px-14">
            <h3 className="text-xl md:text-2xl font-bold select-none py-4">3. Choose your delivery preference</h3>
            <div className="flex flex-row justify-between gap-8">
                <div className="options flex flex-col gap-4">
                    {deliveryOptions.map((option)=> (
                        <ScheduleSelector key={option.id} schedule={option} />
                    ))}
                </div>
                <DeliverySummary />
            </div>
            <div className="w-full flex justify-center pt-5">
                <Button>Continue</Button>
            </div>
        </section>
    )
}