'use client'

import { ProductWithPricing } from "@/types/types"
import { useProduct } from "./product-context"

export default function VaraintDetails() {
    const { selectedPlan } = useProduct()
    return (
        <div className="w-fit">
            <p>{`$ ${selectedPlan?.metadata?.price_per_meal as string}`} Per Meal&emsp;/&emsp; {`${selectedPlan?.metadata?.meals_per_week as string} Meals Per Week`}</p>
        </div>
    )
}