import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaCheckCircle } from "react-icons/fa";

export default function FavouritesPlan() {
    return (
        <form>
            <ol className="flex flex-wrap gap-y-2">
                <li className="bg-background py-10 px-4 sm:px-14 grow">
                    <h2 className="text-xl md:text-2xl font-bold">2. Select number of meals</h2>
                    <div className="grid grid-cols-[2.5rem_2.5rem_2.5rem_2.5rem_auto] grid-rows-3 items-center justify-items-center py-4 gap-x-3">
                        <Button type="button" size="icon" className="font-black text-2xl h-8 w-8">-</Button>
                        <p className="text-2xl font-bold">1</p>
                        <Button type="button" size="icon" className="font-black text-2xl h-8 w-8">+</Button>
                        <p />
                        <p className="justify-self-start">meals per day</p>
                        <p />
                        <p className="font-light">7</p>
                        <p />
                        <p />
                        <p className="justify-self-start font-light">meals per week</p>
                        <p />
                        <p className="font-light line-through">$12.99</p>
                        <p className="font-light">$9.99</p>
                        <p />
                        <p className="justify-self-start font-light">per meal</p>
                    </div>
                </li>
                <li className="bg-background py-10 px-4 sm:px-14 grow">
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
                        <div className="flex flex-col w-full justify-start gap-2">
                            <div className="schedule grid grid-cols-2 grid-rows-7 gap-x-4 gap-y-1">
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
                            <Separator />
                            <div className="grid grid-cols-2 gap-x-4 italic">
                                <p>Delivery fee:</p>
                                <p><span className="line-through">$12.99</span>&emsp;FREE</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center pt-5">
                        <Button>Continue</Button>
                    </div>
                </li>
            </ol>
        </form>
    )
}
