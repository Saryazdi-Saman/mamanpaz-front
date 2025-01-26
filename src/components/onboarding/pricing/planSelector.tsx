'use client'

import { Plan } from "@/types/types";
import { usePlanState } from "./plan-context";

export function PlanSelector({
    plan
}: {
    plan: Plan
}) {
    const { state, updateState } = usePlanState();
    return (
        <>
            <input
                defaultChecked={state.meal_plan.id === plan.id}
                type="radio"
                name="meal_plan_variant"
                id={plan.id}
                value={plan.product_variant.id}
                className="peer hidden"
                onChange={(e) => {
                    updateState({
                        plan_type: "meal_plan",
                        updates: plan
                    })
                }}
            />
            <label
                htmlFor={plan.id}
                className="flex items-center justify-center h-10 w-14 sm:w-20 border-2 transition-colors 
                                    cursor-pointer bg-background border-blue-50 text-blue-200
                                    peer-checked:cursor-default peer-checked:bg-blue-500 peer-checked:text-background peer-checked:border-blue-500"
            >
                {plan.meals_per_day}
            </label>
        </>
    )
}