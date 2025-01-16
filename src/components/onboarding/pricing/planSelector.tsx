'use client'

import { useActionState } from "react";
import { useGuest } from "../guest-context";
import { updatePlanMealCount } from "@/lib/auth/actions";
import clsx from "clsx";

export default function PlanSelector({ value }: { value: number }) {
    const { session, updateSession } = useGuest();
    const [message, formAction] = useActionState(updatePlanMealCount, null);
    const updateMealCount = formAction.bind(null, value);
    const isActive = session.daily_meals === value;
    return (
        <form
            action={async () => {
                updateSession({
                    daily_meals: value,
                    weekly_meals: value * 7
                });
                await updateMealCount();
            }}>
            <button
                disabled={isActive}
                title={`${value} meals per day\n${(value) * 7} meals per week`}
                // className="flex items-center justify-center h-10 w-14 sm:w-20 border background-bg border-blue-50 text-blue-200"
                className={clsx(
                    "flex items-center justify-center h-10 w-14 sm:w-20 border ",
                    {
                        'cursor-default bg-blue-500 text-background border-blue-500': isActive,
                        'cursor-pointer bg-background border-blue-50 text-blue-200': !isActive
                    }
                )}
            >
                {value}
            </button>
        </form>
    )
}