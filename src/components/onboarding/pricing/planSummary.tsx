'use client'

import { useGuest } from "../guest-context";

export default function PlanSummary() {
    const { session } = useGuest();
    return (
        <>
            <p className="">{session.daily_meals}</p>
            <p className="justify-self-start">meals per day</p>
            <p className="">{session.weekly_meals}</p>
            <p className="justify-self-start">meals per week</p>
            <div className="flex flex-col items-end">
                <p className="line-through">$12.99</p>
                <p>$9.99</p>
            </div>
            <p className="justify-self-start self-start">per meal</p>
        </>
    )
}