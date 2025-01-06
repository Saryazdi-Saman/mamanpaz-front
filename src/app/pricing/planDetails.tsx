export default function PlanDetails() {
    return (
        <section className="bg-background py-10 px-14 grow">
            <h2 className="text-2xl font-bold text-center">2. Select your plan</h2>
            <ul className="space-y-4 py-4 mx-auto w-fit">
                <li className="">
                    <div>
                        <h3 className="text-xl font-semibold leading-tight">
                            Meals per day
                        </h3>
                    </div>
                    {/* <div className="h-12 w-80 bg-blue-500 flex items-center justify-start " role="">
                        <p className="text-secondary">1</p>
                    </div> */}
                    <div className="overflow-hidden transition inline-flex ">
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={1} name="mealPerDay" id="oneADay" />
                        <label htmlFor="oneADay" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none " >1</label>
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={2} name="mealPerDay" id="twoADay" />
                        <label htmlFor="twoADay" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none ">2</label>
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={3} name="mealPerDay" id="threeADay" />
                        <label htmlFor="threeADay" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none ">3</label>
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={4} name="mealPerDay" id="fourADay" />
                        <label htmlFor="fourADay" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none ">4</label>
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={5} name="mealPerDay" id="fiveADay" />
                        <label htmlFor="fiveADay" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none ">5</label>
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={6} name="mealPerDay" id="sixADay" />
                        <label htmlFor="sixADay" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none ">6</label>
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={7} name="mealPerDay" id="sevenADay" />
                        <label htmlFor="sevenADay" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none ">7</label>
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={8} name="mealPerDay" id="eightADay" />
                        <label htmlFor="eightADay" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none ">8</label>
                    </div>
                    <p className=" italic"></p>
                    <p className=" italic">selected: 1 meal a day - 7 meals per week</p>
                </li>
                <li className="">
                    <div>
                        <h3 className="text-xl font-semibold leading-tight">
                            Delivery per week
                        </h3>
                    </div>
                    <div className="overflow-hidden transition inline-flex ">
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={1} name="deliveryFreq" id="biWeekly" />
                        <label htmlFor="biWeekly" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none " >2</label>
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={2} name="deliveryFreq" id="triWeekly" />
                        <label htmlFor="triWeekly" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none ">3</label>
                        <input className="hidden [&:checked+label]:bg-teal-600 [&:checked+label]:text-secondary" type="radio" value={7} name="deliveryFreq" id="daily" />
                        <label htmlFor="daily" className="px-4 py-2 bg-teal-50 font-bold cursor-pointer select-none ">7</label>

                    </div>
                    <p>Schedule:</p>
                    <p>Monday: 3 meals</p>
                    <p>Thursday: 4 meals</p>
                </li>
            </ul>
        </section>
    )
}