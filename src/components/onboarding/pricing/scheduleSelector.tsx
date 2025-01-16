'use client'

import { useActionState } from "react";
import { useGuest } from "../guest-context";
import clsx from "clsx";
import { updatePlanSchedule } from "@/lib/auth/actions";
import { Guest } from "@/types/types";
import { FaCheckCircle } from "react-icons/fa";

export default function ScheduleSelector({ value }: { value: Guest['delivery'] }) {
    const { session, updateSession } = useGuest();
    const [message, formAction] = useActionState(updatePlanSchedule, null);
    const updateSchedule = formAction.bind(null, value);
    const isActive = session.delivery === value;

    return (
        <form
            action={async () => {
                updateSession({
                    delivery: value
                });
                await updateSchedule();
            }}>
            <button
                disabled={isActive}
                title={value}
                className={clsx(
                    "select-none px-3 md:px-4 py-3 shadow-sm shadow-blue-800/80 border-2 w-36 md:w-48 flex items-start justify-between",
                    {
                        'cursor-default bg-blue-500 text-background border-blue-500': isActive,
                        'cursor-pointer bg-background border-blue-50 text-blue-200': !isActive
                    }
                )}>
                <div>
                    <p className="text-lg leading-tight font-semibold">{value}</p>
                </div>
                <FaCheckCircle
                    size='20'
                    className={clsx(
                        "checkmark bg-blue-500 rounded-full text-blue-50 select-none self-center",
                        {
                            'opacity-100': isActive,
                            'opacity-0': !isActive
                        }
                    )} />
            </button>
        </form>
    )
}