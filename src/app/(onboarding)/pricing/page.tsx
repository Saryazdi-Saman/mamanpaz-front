import MealCounter from "./mealCounter";
import Plans from "./plans";
import PlanSchedule from "./planSchedule";

export default function Pricing() {
    return (
        <section className="min-h-screen md:px-4 py-16 lg:py-24 lg:px-16 w-full bg-teal-50">
            <h1 className="text-3xl md:text-4xl font-bold text-center">Personalize your plan</h1>
            <p className="text-center text-base md:text-lg text-blue-400 px-4 text-balance">
                Chose a plan we can tailor to you each week. The more you order, the more you save!
            </p>
            <div className="py-16 md:px-4 flex flex-col gap-y-2 w-full max-w-7xl justify-center mx-auto relative">
                <Plans />
                <div className="flex flex-wrap gap-y-2 gap-x-1">
                    <MealCounter />
                    {/* <PlanSchedule /> */}
                </div>
            </div>
        </section>
    )
}