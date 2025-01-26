'use client'

import { DeliverySchedule, Plan } from "@/types/types"
import { useSearchParams } from "next/navigation";
import { createContext, use, useContext, useMemo, useOptimistic, useState } from "react";

type PlanState = {
    meal_plan: Plan,
    delivery_schedule: DeliverySchedule,
}

type updateStateInput =
    | { plan_type: "meal_plan", updates: Plan }
    | { plan_type: "delivery_schedule", updates: DeliverySchedule }

type PlanContextType = {
    state: PlanState;
    updateState: (action: updateStateInput) => PlanState;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({
    children,
    mealPlansPromise,
    deliverySchedulePromise,
}: {
    children: React.ReactNode
    mealPlansPromise: Promise<Plan[]>
    deliverySchedulePromise: Promise<DeliverySchedule[]>
}) {
    const searchParams = useSearchParams();

    const mealPlans = use(mealPlansPromise);
    const deliverySchedule = use(deliverySchedulePromise);

    const searchedPlan = mealPlans.find((plan) => plan.name === searchParams.get("plan"));
    const searchedDelivery = deliverySchedule.find((delivery) => delivery.name === searchParams.get("delivery"));

    const [state, setState] = useState<PlanState>({
        meal_plan: searchedPlan ?? mealPlans[0],
        delivery_schedule: searchedDelivery ?? deliverySchedule[0]
    })

    const updateState = (action: updateStateInput) => {
        console.log("LOGGING FROM PLAN-CONTEXT...")
        console.log(action)
        const newState = { ...state }
        if (action.plan_type === "meal_plan") {
            newState.meal_plan = action.updates;
        }
        if (action.plan_type === "delivery_schedule") {
            newState.delivery_schedule = action.updates;
        }
        setState(newState);
        console.log("STATE:")
        console.log(newState)

        return newState;
    }

    const value = useMemo(
        () => ({
            state,
            updateState
        }),
        [state]
    )

    return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
}

export function usePlanState() {
    const context = useContext(PlanContext);
    if (context === undefined) {
        throw new Error('usePlanState must be used within a PlanProvider');
    }
    return context
}