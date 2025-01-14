import { LogoIcon } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Plans() {
    return (
        <section className="px-4 py-16 lg:py-24 lg:px-16 w-full">
            <header className="w-fit mx-auto">
                <h1 className="text-center lg:text-5xl text-4xl font-medium">Our <span className="font-bold italic">Simple and Easy</span> Pricing</h1>
            </header>

            <ul className="py-10 w-full max-w-7xl flex flex-col md:flex-row items-center gap-6 mx-auto justify-center px-4">
                <li className="max-w-96 border-4 border-teal-500 py-5 px-6 w-full">
                    <article className="flex flex-col gap-6 sm:gap-9 h-full">
                        {/* <p className=" uppercase font-bold text-sm text-blue-400">Basic Plan</p> */}
                        <LogoIcon width={70} className='text-teal-500 h-20' />
                        <header className="space-y-5 h-40">
                            <h2 className="font-medium text-4xl lg:text-5xl text-teal-600">Maman&apos;s Favourites</h2>
                            <p className="text-xl text-blue-400">Tell us how many meals you need every day, and recieve your daily meals straight out of maman&apos;s kitchen.</p>
                        </header>
                        <div className="flex flex-col justify-end w-full h-40 items-start" >
                            <Button asChild className="self-center">
                                <Link href="/pricing">
                                    Select Plan <ArrowRightIcon />
                                </Link>
                            </Button>
                        </div>
                    </article>
                </li>
                <li className="max-w-96 border-4 border-brown-500 py-5 px-6 w-full">
                    <article className="flex flex-col gap-6 sm:gap-9 h-full">
                        {/* <p className=" uppercase font-bold text-sm text-blue-400">Basic Plan</p> */}
                        <LogoIcon width={70} className='text-brown-500 h-20' />
                        <header className="space-y-5 h-40">
                            <h2 className="font-medium text-4xl lg:text-5xl text-brown-600">Weight Loss</h2>
                            <p className="text-xl text-blue-400 ">Tell us how many meals you need every day, and recieve your daily meals straight out of maman&apos;s kitchen.</p>
                        </header>
                        <div className="flex flex-col justify-end w-full h-40 items-start" >
                            <Button asChild className="self-center">
                                <Link href="/pricing">
                                    Select Plan <ArrowRightIcon />
                                </Link>
                            </Button>
                        </div>
                    </article>
                </li>

                {/* <li className="max-w-96 w-full border-4 border-brown-500 py-5 px-6">
                    <article className="flex flex-col gap-9 h-full">
                        <LogoIcon width={70} className='text-brown-500' />
                        <header className="space-y-4">
                            <h2 className="font-medium text-4xl lg:text-5xl">7 Meals/Week</h2>
                            <p className="text-base text-blue-400">Perfect for singles or small families looking for homemade goodness.</p>
                        </header>
                        <div className="flex justify-between h-fit">
                            <p className="font-bold text-5xl">$11 <span className="font-normal text-xl text-blue-300">/meal</span></p>
                            <Button size="sm" asChild>
                                <Link href="/pricing">
                                    Select Plan <ArrowRightIcon />
                                </Link>
                            </Button>
                        </div>
                    </article>
                </li> */}

                {/* <li className="w-[26rem] border-4 border-blue-500 py-5 px-6">
                    <article className="flex flex-col gap-9 h-full">
                        <p className=" uppercase font-bold text-sm text-blue-400">Basic Plan</p>
                        <LogoIcon width={70} className='text-blue-500' />
                        <header className="space-y-4">
                            <h2 className="font-medium text-4xl lg:text-5xl">7 Meals/Week</h2>
                            <p className="text-base text-blue-400">Perfect for singles or small families looking for homemade goodness.</p>
                        </header>
                        <div className="flex justify-between h-fit">
                            <p className="font-bold text-5xl">$11 <span className="font-normal text-xl text-blue-300">/meal</span></p>
                            <Button size="sm" asChild>
                                <Link href="/pricing">
                                    Select Plan <ArrowRightIcon />
                                </Link>
                            </Button>
                        </div>
                    </article>
                </li> */}
            </ul>
        </section>
    )
}