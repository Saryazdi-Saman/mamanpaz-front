import { LogoIcon } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Plans() {
    return (
        <section className="px-4 py-16 sm:py-24 sm:px-16">
            <header className="w-fit mx-auto">
                <h1 className="text-center sm:text-5xl text-4xl font-medium">Our <span className="font-bold italic">Simple and Easy</span> Pricing</h1>
            </header>


            <ul className="py-10 max-w-7xl flex flex-col sm:flex-row gap-6 mx-auto">
                <li className="max-w-md h-[33rem] bg-teal-50 grow rounded-2xl py-5 px-6">
                    <article className="flex flex-col gap-9 h-full">
                        <p className=" uppercase font-bold text-sm text-blue-400">Basic Plan</p>
                        <LogoIcon width={70} className='text-teal-500'/>
                        <header className="space-y-4">
                            <h2 className="font-medium text-4xl">7 Meals/Week</h2>
                            <p className="text-base text-blue-400">Perfect for singles or small families looking for homemade goodness.</p>
                        </header>
                        <div className="grow"></div>
                        <div className="flex justify-between h-fit">
                            <p className="font-bold text-5xl">$11 <span className="font-normal text-xl text-blue-300">/meal</span></p>
                            <Button size="sm" className="rounded-full">Select Plan <ArrowRightIcon /></Button>
                        </div>
                    </article>
                </li>

                <li className="max-w-md h-[33rem] bg-brown-50 grow rounded-2xl py-5 px-6">
                    <article className="flex flex-col gap-9 h-full">
                        <p className=" uppercase font-bold text-sm text-blue-400">Basic Plan</p>
                        <LogoIcon width={70} className='text-brown-500'/>
                        <header className="space-y-4">
                            <h2 className="font-medium text-5xl">7 Meals/Week</h2>
                            <p className="text-base text-blue-400">Perfect for singles or small families looking for homemade goodness.</p>
                        </header>
                        <div className="grow"></div>
                        <div className="flex justify-between h-fit">
                            <p className="font-bold text-5xl">$11 <span className="font-normal text-xl text-blue-300">/meal</span></p>
                            <Button size="sm" className="rounded-full">Select Plan <ArrowRightIcon /></Button>
                        </div>
                    </article>
                </li>


                <li className="max-w-md h-[33rem] bg-blue-50 grow rounded-2xl py-5 px-6">
                    <article className="flex flex-col gap-9 h-full">
                        <p className=" uppercase font-bold text-sm text-blue-400">Basic Plan</p>
                        <LogoIcon width={70} className='text-blue-500'/>
                        <header className="space-y-4">
                            <h2 className="font-medium text-5xl">7 Meals/Week</h2>
                            <p className="text-base text-blue-400">Perfect for singles or small families looking for homemade goodness.</p>
                        </header>
                        <div className="grow"></div>
                        <div className="flex justify-between h-fit">
                            <p className="font-bold text-5xl">$11 <span className="font-normal text-xl text-blue-300">/meal</span></p>
                            <Button size="sm" className="rounded-full">Select Plan <ArrowRightIcon /></Button>
                        </div>
                    </article>
                </li>
            </ul>
        </section>
    )
}