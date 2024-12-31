export default function PlanDetails() {
    return (
        <section className="bg-background py-10 px-14">
            <h2 className="text-2xl font-bold text-center">2. Select your plan</h2>
            <ul className="space-y-4 py-4 mx-auto w-fit">
                <li className="flex justify-between items-baseline">
                    <div>
                        <h3 className="text-xl font-semibold leading-tight">
                            Meals per day
                        </h3>
                        <p>(7 meals per week)</p>
                    </div>
                    <div className="h-12 w-80 bg-blue-500 flex items-center justify-start ">
                        <p className="text-secondary">1</p>
                    </div>
                </li>
                <li className="flex justify-between items-baseline">
                    <div>
                        <h3 className="text-xl font-semibold leading-tight">
                            Delivery per week
                        </h3>
                        <p>Monday: 3 meals</p>
                        <p>Thursday: 4 meals</p>
                    </div>
                    <div className="h-12 w-80 bg-blue-500 flex items-center justify-start ">
                        <p className="text-secondary">2</p>
                    </div>
                </li>
            </ul>
        </section>
    )
}