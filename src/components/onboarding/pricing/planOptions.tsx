import { getAvailablePlans } from "@/lib/db/store-queries";
import { PlanSelector } from "./planSelector";
import { Plan } from "@/types/types";

export default async function PlanOptions({
    plans
}: {
    plans: Promise<Plan[]>
}) {
    const availablePlans = await plans;
    return (
        <section className="bg-background py-10 px-4 sm:px-14 grow select-none">
            <h3 className="text-xl md:text-2xl font-bold select-none py-4">2. Select number of meals</h3>
            {/* <div className="flex justify-start items-start py-4 select-none gap-6 sm:gap-10">
                    <PlanSelector plans={availablePlans} /> */}

            <div
                className="grid grid-cols-[1fr_1fr_4fr] grid-rows-5 gap-2 sm:gap-3 w-fit">
                {Array.from({ length: availablePlans.length * 2 }, (_, i) => {
                    if (i % 2 !== 0) {
                        return (
                            <div
                                key={i}
                                className="col-start-3 row-start-1 col-span-full row-span-full justify-items-end hidden"
                            >
                                <div className="grid grid-cols-[auto_auto] grid-rows-[1fr_1fr_2fr] items-start justify-items-end gap-x-2 sm:gap-x-6 gap-y-2">
                                    <p className="">{availablePlans[(i - 1) / 2].meals_per_day}</p>
                                    <p className="justify-self-start">meals per day</p>
                                    <p className="">{availablePlans[(i - 1) / 2].meals_per_week}</p>
                                    <p className="justify-self-start">meals per week</p>
                                    <div className="flex flex-col items-end">

                                        <p>${availablePlans[(i - 1) / 2].price_per_meal}</p>
                                    </div>
                                    <p className="justify-self-start self-start">per meal</p>
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div key={i} className="[&:has(input:checked)+div]:block" >
                            <PlanSelector plan={availablePlans[i / 2]} />
                        </div>
                    )
                }
                )}
            </div>
            {/* </div> */}
        </section>
    )
}