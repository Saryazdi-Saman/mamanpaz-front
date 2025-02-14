'use client'

import { useProduct } from "./product-context"

type DeliverySchedule = {
    title: string
    day1: number
    day2: number
    day3: number
    day4: number
    day5: number
    day6: number
    day7: number
}

export default function DeliverySchedule() {
    const { deliveryDays, selectedPlan } = useProduct()
    const deliverySchedule: DeliverySchedule | undefined = selectedPlan?.metadata?.delivery_schedule as DeliverySchedule
    console.log(deliveryDays)
    return (
        <div>
            <div className="mb-3 flex flex-col border-b pb-3">
                <h3 className="mb-2 text-2xl font-medium">
                    {deliverySchedule.title as string}&nbsp;delivery
                </h3>
            </div>
            <p className="mb-2 font-bold">Schedule :</p>
            {deliveryDays && deliveryDays.map((day, i) => (
                <div key={i} className="flex w-full justify-between items-baseline gap-10">
                <p>{day.dayOfWeek}{i=== 0 && ' (Tomorrow)'}: </p>
                <p>{day.meals} meals</p>
            </div>
            ))}
        </div>
    )
}