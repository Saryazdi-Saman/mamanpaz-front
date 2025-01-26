import { Separator } from "@/components/ui/separator"
import { DeliverySchedule } from "@/types/types"

export const DeliverySummary = ({
    schedule,
    multiplier
}: {
    schedule: DeliverySchedule
    multiplier: number
}) => {
    return (
        <div className="flex flex-col w-full justify-start gap-2">
            <div className="schedule grid grid-cols-2 grid-rows-7 gap-x-4 gap-y-1">
                <p>Monday:</p>
                <p>{schedule.monday === 0 ? "-" : `${schedule.monday * multiplier} meals`}</p>
                <p>Tuesday:</p>
                <p>{schedule.tuesday === 0 ? "-" : `${schedule.tuesday * multiplier} meals`}</p>
                <p>Wednesday:</p>
                <p>{schedule.wednesday === 0 ? "-" : `${schedule.wednesday * multiplier} meals`}</p>
                <p>Thursday:</p>
                <p>{schedule.thursday === 0 ? "-" : `${schedule.thursday * multiplier} meals`}</p>
                <p>Friday:</p>
                <p>{schedule.friday === 0 ? "-" : `${schedule.friday * multiplier} meals`}</p>
                <p>Saturday:</p>
                <p>{schedule.saturday === 0 ? "-" : `${schedule.saturday * multiplier} meals`}</p>
                <p>Sunday:</p>
                <p>{schedule.sunday === 0 ? "-" : `${schedule.sunday * multiplier} meals`}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-x-4 italic">
                <p>Delivery fee:</p>
                <p><span className="line-through">${schedule.price}</span>&emsp;FREE</p>
            </div>
        </div>
    )
}
