import Image from "next/image";
import heroImage from "@/assets/hero.png"
import { Button } from "@/components/ui/button";
import { DeliveryIcon } from "@/assets/svg";
import { ArrowRightIcon } from "lucide-react";

const statsItems = [
    {
        value: "98%",
        description: "98% of our customers rate our meals as fresh",
    },
    {
        value: "50,000+",
        description: "We've delivered 50k+ homemade Persian meals"
    },
    {
        value: "20+ dishes",
        description: "Choose from over 20 traditional Persian dishes",
    },
    {
        value: "05 mins",
        description: "No cooking required—simply heat and enjoy"
    },
];

export default function Hero() {
    return (
        <section className="hero h-[calc(100svh-4rem)] flex flex-col snap-end">
            <section className="hero-content relative flex-grow bg-background py-6 px-16">
                    <Image
                        src={heroImage}
                        alt="Dinner table set up with homemade meals"
                        sizes="100vw"
                        quality={100}
                        priority
                        fill
                        className="z-0 object-cover"
                    />
                    <div className="flex flex-col items-start justify-center h-full grow">
                        <header className="grow flex flex-col items-start justify-center max-w-md gap-10 z-10">
                            <h1 className="text-5xl font-medium">
                                Homemade <span className="italic font-bold">Meals</span> Delivered to Your Doorstep
                            </h1>
                            <Button className="rounded-full">
                                See Plans <ArrowRightIcon aria-hidden="true" />
                            </Button>
                        </header>
                        <div className="flex gap-3 z-10 items-center">
                            <DeliveryIcon aria-hidden="true" />
                            <div>
                                <p className="text-base font-bold">Delivered Food Boxes</p>
                                <p className="text-3xl font-bold">165,370</p>
                            </div>
                        </div>
                    </div>
            </section>
            <section className="hero-stats h-fit px-16 w-full bg-background pb-16 pt-6">
                <ul className="grid auto-cols-fr grid-flow-col gap-16">
                    {statsItems.map((stat, index) => (
                        <li key={index}>
                            <article className="flex flex-col items-start justify-start">
                                <h2 className="text-5xl font-medium">{stat.value}</h2>
                                <p className="text-xl text-muted-foreground">{stat.description}</p>
                            </article>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}
