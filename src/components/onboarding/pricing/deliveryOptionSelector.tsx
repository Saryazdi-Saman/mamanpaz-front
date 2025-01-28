import clsx from "clsx";
import { DeliverySchedule } from "@/types/types";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function DeliveryOptionSelector({ 
    schedule,
    selectedDelivery,
    selectedPlan 
}: { 
    schedule: DeliverySchedule,
    selectedDelivery: {
        slug: string | string[]
        id: string
    },
    selectedPlan: {
        slug: string | string[]
        id: string
    }
 }) {

    const isActive = schedule.slug === selectedDelivery.slug;
    return (
            <Link
                href={`?plan=${selectedPlan.slug}&delivery=${schedule.slug}`}
                scroll={false}
                replace
                className={clsx(
                    "select-none px-3 md:px-4 py-3 shadow-sm shadow-blue-800/80 border-2 w-36 md:w-48 flex items-start justify-between",
                    {
                        "cursor-pointer bg-background border-blue-50 text-blue-200": !isActive,
                        "cursor-default bg-blue-500 text-background border-blue-500": isActive
                    }
                )}
            >
                <div>
                    <p className="text-lg leading-tight font-semibold">{schedule.name}</p>
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
            </Link>
    )
}   