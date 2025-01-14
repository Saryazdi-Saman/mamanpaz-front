import { FaCheckCircle } from "react-icons/fa";

export default function PlanDetails() {
    return (
        <section className="bg-background py-10 px-4 md:px-14 grow">
            <h2 className="text-xl md:text-2xl font-bold">3. Choose your delivery preference</h2>
            <div className="flex flex-row justify-between py-4 gap-8">
                <div className="options flex flex-col gap-4">
                    <input className="hidden [&:checked+label]:text-secondary [&:checked+label]:font-semibold [&:checked+label]:border-4 [&:checked+label>.checkmark]:opacity-100" type="radio" value={1} name="Schedule" id="biweekly" defaultChecked />
                    <label htmlFor="biweekly" className="font-medium select-none bg-background border-blue-500 px-3 md:px-4 py-3 cursor-pointer shadow-sm shadow-blue-800/80 border-2 w-36 md:w-48 flex items-start justify-between">
                        <div>
                            <p className="text-lg leading-tight text-blue-500">
                                Bi-weely
                            </p>
                        </div>
                        <FaCheckCircle size='20' className="checkmark bg-blue-50 rounded-full text-blue-500 select-none self-center opacity-0" />
                    </label>
                    <input className="hidden [&:checked+label]:font-semibold [&:checked+label]:border-4 [&:checked+label>.checkmark]:opacity-100" type="radio" value={1} name="Schedule" id="triweekly" />
                    <label htmlFor="triweekly" className="select-none font-medium bg-background border-blue-500 px-3 md:px-4 py-3 cursor-pointer shadow-sm shadow-blue-800/80 border-2 w-36 md:w-48 flex items-start justify-between">
                        <div>
                            <p className="text-lg leading-tight text-blue-500">
                                Tri-weely
                            </p>
                        </div>
                        <FaCheckCircle size='20' className="checkmark bg-blue-50 rounded-full text-blue-500 select-none self-center opacity-0" />
                    </label>
                    <input className="hidden [&:checked+label]:font-semibold [&:checked+label]:border-4 [&:checked+label>.checkmark]:opacity-100" type="radio" value={1} name="Schedule" id="daily" />
                    <label htmlFor="daily" className="select-none font-medium bg-background border-blue-500 px-3 md:px-4 py-3 cursor-pointer shadow-sm shadow-blue-800/80 border-2 w-36 md:w-48 flex items-start justify-between">
                        <div>
                            <p className="text-lg leading-tight text-blue-500">
                                Daily
                            </p>
                        </div>
                        <FaCheckCircle size='20' className="checkmark bg-blue-50 rounded-full text-blue-500 select-none self-center opacity-0" />
                    </label>
                </div>
                <div className="schedule grid grid-cols-2 grid-rows-8 gap-x-4 gap-y-1">
                    <p>Monday:</p>
                    <p>3 meals</p>
                    <p>Tuesday:</p>
                    <p>-</p>
                    <p>Wednesday:</p>
                    <p>-</p>
                    <p>Thursday:</p>
                    <p>4 meals</p>
                    <p>Friday:</p>
                    <p>-</p>
                    <p>Saturday:</p>
                    <p>-</p>
                    <p>Sunday:</p>
                    <p>-</p>
                </div>
            </div>
        </section>
    )
}