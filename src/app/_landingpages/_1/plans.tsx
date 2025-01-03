import { LogoIcon } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function Plans() {
    return (
        <section className="px-4 py-16 lg:py-24 lg:px-16 w-full">
            <header className="w-fit mx-auto">
                <h1 className="text-center lg:text-5xl text-4xl font-medium">Our <span className="font-bold italic">Simple and Easy</span> Pricing</h1>
            </header>

            <ul className="py-10 w-full max-w-7xl flex flex-col items-center lg:flex-row lg:flex-nowrap gap-6 mx-auto md:flex-wrap justify-center">
                <li className="w-[26rem] border-4 border-teal-500 py-5 px-6">
                    <article className="flex flex-col gap-9 h-full">
                        <p className=" uppercase font-bold text-sm text-blue-400">Basic Plan</p>
                        <LogoIcon width={70} className='text-teal-500'/>
                        <header className="space-y-4">
                            <h2 className="font-medium text-4xl lg:text-5xl">7 Meals/Week</h2>
                            <p className="text-base text-blue-400">Perfect for singles or small families looking for homemade goodness.</p>
                        </header>
                        <div className="flex justify-between h-fit">
                            <p className="font-bold text-5xl">$11 <span className="font-normal text-xl text-blue-300">/meal</span></p>
                            <Button size="sm" >Select Plan <ArrowRightIcon /></Button>
                        </div>
                    </article>
                </li>

                <li className="w-[26rem] border-4 border-brown-500 py-5 px-6">
                    <article className="flex flex-col gap-9 h-full">
                        <p className=" uppercase font-bold text-sm text-blue-400">Basic Plan</p>
                        <LogoIcon width={70} className='text-brown-500'/>
                        <header className="space-y-4">
                            <h2 className="font-medium text-4xl lg:text-5xl">7 Meals/Week</h2>
                            <p className="text-base text-blue-400">Perfect for singles or small families looking for homemade goodness.</p>
                        </header>
                        <div className="flex justify-between h-fit">
                            <p className="font-bold text-5xl">$11 <span className="font-normal text-xl text-blue-300">/meal</span></p>
                            <Button size="sm" >Select Plan <ArrowRightIcon /></Button>
                        </div>
                    </article>
                </li>

                <li className="w-[26rem] border-4 border-blue-500 py-5 px-6">
                    <article className="flex flex-col gap-9 h-full">
                        <p className=" uppercase font-bold text-sm text-blue-400">Basic Plan</p>
                        <LogoIcon width={70} className='text-blue-500'/>
                        <header className="space-y-4">
                            <h2 className="font-medium text-4xl lg:text-5xl">7 Meals/Week</h2>
                            <p className="text-base text-blue-400">Perfect for singles or small families looking for homemade goodness.</p>
                        </header>
                        <div className="flex justify-between h-fit">
                            <p className="font-bold text-5xl">$11 <span className="font-normal text-xl text-blue-300">/meal</span></p>
                            <Button size="sm" >Select Plan <ArrowRightIcon /></Button>
                        </div>
                    </article>
                </li>
            </ul>
        </section>
    )
}