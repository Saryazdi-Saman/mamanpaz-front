import ScheduleSelector from "@/components/onboarding/pricing/scheduleSelector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PlanSchedule() {
    return (
        <section className="bg-background py-10 px-4 sm:px-14 grow">
            <h2 className="text-xl md:text-2xl font-bold">3. Choose your delivery preference</h2>
            <div className="flex flex-row justify-between py-4 gap-8">
                <div className="options flex flex-col gap-4">
                    <ScheduleSelector value="biweekly" />
                    <ScheduleSelector value="triweekly" />
                    <ScheduleSelector value="daily" />
                </div>
                <div className="flex flex-col w-full justify-start gap-2">
                    <div className="schedule grid grid-cols-2 grid-rows-7 gap-x-4 gap-y-1">
                        <p>Monday:</p>
                        <p>3 meals</p>
                        <p>Tuesday:</p>
                        <p>-</p>
                        <p>Wednesday:</p>
                        <p>-</p>
                        <p>Thursday:</p>
                        <p>4 meals</p>
                        <p>Friday:</p>
                        <p>-</p>
                        <p>Saturday:</p>
                        <p>-</p>
                        <p>Sunday:</p>
                        <p>-</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-x-4 italic">
                        <p>Delivery fee:</p>
                        <p><span className="line-through">$12.99</span>&emsp;FREE</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center pt-5">
                <Button>Continue</Button>
            </div>
        </section>
    )
}