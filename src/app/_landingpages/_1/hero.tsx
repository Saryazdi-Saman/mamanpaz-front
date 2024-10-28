import { DeliveryIcon } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { getImageProps } from "next/image";

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
    const common = { alt: 'Dinner table set up with homemade meals', sizes: '100vw' }
    const {
        props: { srcSet: desktop },
    } = getImageProps({
        ...common,
        width: 1636,
        height: 599,
        quality: 100,
        src: '/hero.png'
    })
    const {
        props: { srcSet: mobile, ...rest },
    } = getImageProps({
        ...common,
        width: 640,
        height: 896,
        quality: 85,
        src: '/hero-mobile.png',
    })
    return (
        // TODO: h-screen should be fixed
        <section className="hero min-h-[calc(100svh-3rem)] sm:h-[calc(100svh-4rem)] w-screen flex flex-col snap-end gap-8 sm:gap-0">
            <section className="hero-content relative max-h-screen flex-grow bg-background">
                <picture className="z-0 absolute h-full w-full">
                    <source media="(min-width: 1024px)" srcSet={desktop} />
                    <source srcSet={mobile} />
                    <img {...rest} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </picture>
                <div className="px-16 grow h-[calc(100vh-3rem)]
                sm:h-full sm:py-8">

                    <div className="h-1/2 sm:h-full w-full relative flex flex-col items-center justify-start sm:items-start">
                        <header className="flex flex-col justify-center z-10 h-full w-full
                    items-center gap-8 max-w-sm gorw
                    sm:items-start sm:grow sm:gap-10 sm:max-w-md">

                            <h1 className="font-medium text-3xl text-center sm:text-start sm:text-5xl">
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
                </div>
            </section>
            <section className="z-10 hero-stats h-fit px-16 w-full bg-background pb-16 pt-6">
                <ul className="grid auto-rows-fr grid-flow-row sm:auto-cols-fr sm:grid-flow-col sm:gap-16 gap-16">
                    {statsItems.map((stat, index) => (
                        <li key={index}>
                            <article className="flex flex-col items-center justify-start gap-6 sm:items-start text-center sm:text-start">
                                <h2 className="text-4xl sm:text-5xl font-medium">{stat.value}</h2>
                                <p className="text-xl text-muted-foreground">{stat.description}</p>
                            </article>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}
