import { DeliveryIcon } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { getImageProps } from "next/image";
import Link from "next/link";

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
        quality: 85,
        src: '/hero-arezou.jpg'
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
        <section className="hero w-full lg:flex lg:flex-col lg:h-[calc(100svh-5rem)] overflow-clip">
            <section className="hero-content relative h-[calc(100svh-3.75rem)] bg-background flex-grow lg:h-full">
                <picture className="z-0 absolute h-full w-full">
                    <source media="(min-width: 1024px)" srcSet={desktop} />
                    <source srcSet={mobile} />
                    <img {...rest} alt="tradditional persian dinner table" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </picture>
                <div className="px-16 h-[calc(100vh-3.75rem)]
                lg:h-full lg:py-16">

                    <div className="h-1/2 lg:h-full w-full relative flex flex-col items-center justify-start lg:items-start">
                        <header className="flex flex-col justify-center z-10 h-full w-full
                    items-center gap-8 max-w-sm gorw
                    lg:items-start lg:grow lg:gap-10 
                    xl:max-w-md">

                            <h1 className="leading-tight font-medium text-3xl text-center text-background lg:text-start lg:text-5xl lg:leading-tight xl:text-5xl xl:leading-tight">
                                Homemade <span className="italic font-bold">Meals</span> Delivered to Your Doorstep
                            </h1>
                            <Button className="border border-blue-100" asChild>
                                <Link href="/pricing">
                                    See Plans <ArrowRightIcon aria-hidden="true" />
                                </Link>
                            </Button>
                        </header>
                        <div className="flex gap-3 z-10 items-center text-background lg:self-end">
                            <DeliveryIcon aria-hidden="true" />
                            <div>
                                <p className="text-base font-bold leading-tight">Delivered Food Boxes</p>
                                <p className="text-3xl font-bold leading-tight">165,370</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="hero-stats h-fit px-4 md:px-16 w-full bg-background py-6 ">
                {/* <ul className="flex flex-wrap justify-center md:gap-8 xl:gap-16 gap-16"> */}
                <ul className="w-full grid grid-cols-2 grid-rows-2 gap-y-9 gap-x-6 justify-items-center
                    lg:grid-cols-4 lg:grid-rows-1  lg:gap-8 xl:gap-16">
                    {statsItems.map((stat, index) => (
                        <li key={index} className="max-w-72">
                            <article className="flex flex-col items-center justify-start md:gap-3 xl:gap-3 lg:items-start text-center lg:text-start">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium">{stat.value}</h2>
                                <p className="text-lg md:text-xl text-muted-foreground">{stat.description}</p>
                            </article>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}
