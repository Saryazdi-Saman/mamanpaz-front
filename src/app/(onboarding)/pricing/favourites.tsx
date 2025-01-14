import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaCheckCircle } from "react-icons/fa";

export default function FavouritesPlan() {
    return (
        <form>
            <ol className="flex flex-wrap gap-y-2 gap-x-1">
                <li className="bg-background py-10 px-4 sm:px-14 grow">
                    <h2 className="text-xl md:text-2xl font-bold">2. Select number of meals</h2>
                    <div className="flex justify-between items-start py-4 select-none">
                        <div className="grid grid-cols-2 grid-rows-5 gap-2 md:gap-3">
                            {/* <div className="flex items-center justify-center h-10 w-14 md:w-20 border-blue-500 bg-blue-500 text-background shadow-sm shadow-blue-800/80">
                                <p className="text-2xl font-bold">{1}</p>
                            </div> */}
                            {Array.from({ length: 10 }, (_, i) => (
                                <div key={i} className="shadow-sm shadow-blue-800/80 cursor-pointer ">
                                    <input className="hidden [&:checked+label]:border-blue-500 [&:checked+label]:bg-blue-500 [&:checked+label]:text-background" type="radio" value={i} name="meals" id={`${i}_meal`} defaultChecked={i === 0} />
                                    <label className="flex items-center justify-center h-10 w-14 md:w-20 border border-blue-50 text-blue-200" htmlFor={`${i}_meal`}>
                                        <p className="text-xl font-semibold ">{i + 1}</p>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-[auto_auto] grid-rows-[1fr_1fr_2fr] items-start justify-items-center gap-x-4 gap-y-2">
                            <p className="">1</p>
                            <p className="justify-self-start">meals per day</p>
                            <p className="">7</p>
                            <p className="justify-self-start">meals per week</p>
                            <div className="flex flex-col items-end">
                                <p className="line-through">$12.99</p>
                                <p>$9.99</p>
                            </div>
                            <p className="justify-self-start self-start">per meal</p>
                        </div>
                    </div>
                </li>


                <li className="bg-background py-10 px-4 sm:px-14 grow">
                    <h2 className="text-xl md:text-2xl font-bold">3. Choose your delivery preference</h2>
                    <div className="flex flex-row justify-between py-4 gap-8">
                        <div className="options flex flex-col gap-4">
                            <input className="hidden [&:checked+label]:text-secondary [&:checked+label]:bg-blue-500 [&:checked+label]:border-blue-500 [&:checked+label>.checkmark]:opacity-100" type="radio" value={1} name="Schedule" id="biweekly" defaultChecked />
                            <label htmlFor="biweekly" className="select-none font-semibold bg-background border-blue-50 px-3 md:px-4 py-3 cursor-pointer shadow-sm shadow-blue-800/80 border-2 w-36 md:w-48 flex items-start justify-between text-blue-200">
                                <div>
                                    <p className="text-lg  leading-tight">
                                        Bi-weely
                                    </p>
                                </div>
                                <FaCheckCircle size='20' className="checkmark bg-blue-500 rounded-full text-blue-50 select-none self-center opacity-0" />
                            </label>
                            <input className="hidden [&:checked+label]:text-secondary [&:checked+label]:bg-blue-500 [&:checked+label]:border-blue-500 [&:checked+label>.checkmark]:opacity-100" type="radio" value={1} name="Schedule" id="triweekly" />
                            <label htmlFor="triweekly" className="select-none font-semibold bg-background border-blue-50 px-3 md:px-4 py-3 cursor-pointer shadow-sm shadow-blue-800/80 border-2 w-36 md:w-48 flex items-start justify-between text-blue-200">
                                <div>
                                    <p className="text-lg leading-tight">
                                        Tri-weely
                                    </p>
                                </div>
                                <FaCheckCircle size='20' className="checkmark bg-blue-500 rounded-full text-blue-50 select-none self-center opacity-0" />
                            </label>
                            <input className="hidden [&:checked+label]:text-secondary [&:checked+label]:bg-blue-500 [&:checked+label]:border-blue-500 [&:checked+label>.checkmark]:opacity-100" type="radio" value={1} name="Schedule" id="daily" />
                            <label htmlFor="daily" className="select-none font-semibold bg-background border-blue-50 px-3 md:px-4 py-3 cursor-pointer shadow-sm shadow-blue-800/80 border-2 w-36 md:w-48 flex items-start justify-between text-blue-200">
                                <div>
                                    <p className="text-lg leading-tight">
                                        Daily
                                    </p>
                                </div>
                                <FaCheckCircle size='20' className="checkmark bg-blue-500 rounded-full text-blue-50 select-none self-center opacity-0" />
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
