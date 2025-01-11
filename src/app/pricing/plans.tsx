import { FaCheckCircle } from "react-icons/fa";

export default function Plans() {
    return (
        <section className="bg-background py-10 px-4 lg:px-10 xl:px-14 grow bg-teal-600">
            <h2 className="text-xl lg:text-2xl font-bold text-left md:text-center text-background">1. Choose your preferred plan</h2>
            {/* This div should be a FORM element */}
            <div className="py-4 mx-auto w-fit flex flex-wrap gap-4 items-stretch justify-center">
                <input className="hidden [&:checked+label]:border-4 [&:checked+label>.checkmark]:bg-teal-600" type="radio" value={1} name="plan" id="favorites" defaultChecked />
                <label htmlFor="favorites" className="select-none border-teal-50 px-10 py-6 cursor-pointer shadow-md shadow-teal-800/80 border w-80 lg:w-96 flex items-start justify-between">
                    <div>
                        <h3 className="text-lg lg:text-xl font-semibold leading-tight text-background font-body">
                            Maman&apos;s Favorites
                        </h3>
                        <p className="text-background">Maman&apos;s special meals</p>
                    </div>
                    <FaCheckCircle size='24' className="checkmark bg-teal-50 rounded-full text-teal-50 select-none self-center" />
                </label>

                <input className="hidden [&:checked+label]:border-4 [&:checked+label>.checkmark]:bg-teal-600" type="radio" value={1} name="plan" id="diet" />
                <label htmlFor="diet" className="select-none border-teal-50 px-10 py-6 cursor-pointer shadow-md shadow-teal-800/80 border w-80 lg:w-96 flex items-start justify-between">
                    <div className="w-64">
                        <h3 className="text-lg lg:text-xl font-semibold leading-tight font-body text-background">
                            Wight Loss
                        </h3>
                        <p className="text-background">Our dietition will call you to create your perfect meal plan</p>
                    </div>
                    <FaCheckCircle size='24' className="checkmark bg-teal-50 rounded-full text-teal-50 select-none self-center" />
                </label>
            </div>
        </section>
    )
}