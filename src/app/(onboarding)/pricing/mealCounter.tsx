import PlanSummary from "@/components/onboarding/pricing/planSummary";
import PlanSelector from "@/components/onboarding/pricing/planSelector";

export default function MealCounter() {
    return (
        <section className="bg-background py-10 px-4 sm:px-14 grow">
            <h2 className="text-xl md:text-2xl font-bold">2. Select number of meals</h2>
            <div className="flex justify-start items-start py-4 select-none gap-6 sm:gap-10">
                <div
                    className="grid grid-cols-2 grid-rows-5 gap-2 sm:gap-3 text-xl font-semibold">
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="shadow-sm shadow-blue-800/80">
                            <PlanSelector value={i + 1} />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-[auto_auto] grid-rows-[1fr_1fr_2fr] items-start justify-items-center gap-x-2 sm:gap-x-4 gap-y-2">
                    <PlanSummary/>
                </div>
            </div>
        </section>
    )
}