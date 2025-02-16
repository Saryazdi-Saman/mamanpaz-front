import { LogoIcon } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import IKImage from "@/lib/IKImage";
import { ArrowRightIcon } from "lucide-react";

export default function PromoBanner() {


    return (
        <section className="px-4 w-svw">
            <div className="min-h-80 rounded-3xl bg-brown-100 flex justify-between mx-auto overflow-clip relative
        flex-col items-center w-full gap-8 
        md:flex-row md:w-full md:max-w-7xl md:h-80 md:my-12 md:gap-4 
        lg:gap-12">
                <div className="relative
            w-full h-60 grow 
            md:h-full md:aspect-square">
                    <IKImage
                        src='packaging/mockup-4.png'
                        alt='packaged mamanpaz meal'
                        fill
                        className="object-cover"
                        sizes="33vw"
                    />
                </div>
                <div className="max-w-sm flex flex-col justify-center
            h-fit gap-8 items-center text-center px-6 md:px-2
            md:h-full md:items-start md:gap-10 md:text-start">
                    <h2 className="font-semibold text-2xl lg:text-4xl text-pretty">Get <span className="italic font-bold">20% OFF</span> on your monthly plan</h2>
                    <Button className="rounded-full">See Plans <ArrowRightIcon /></Button>
                </div>

                {/*-----Background Patterns-----*/}
                {/*------------Mobile-----------*/}
                <div className="md:hidden grid grid-cols-7 h-fit w-fit -mb-3" aria-hidden='true'>
                    {Array.from({ length: 21 }).map((_, index) => (
                        <LogoIcon
                            key={index}
                            className={`h-10 ${((Math.floor(index / 7) + (index % 7)) % 2 === 0 ? 'text-brown-200' : 'opacity-0')
                                }`}
                        />
                    ))}
                </div>

                {/*------------Desktop-----------*/}
                <div className="hidden md:grid grid-cols-4 gap-x-8 px-4" aria-hidden='true'>
                    {Array.from({ length: 44 }).map((_, index) => (
                        <LogoIcon
                            key={index}
                            className={`h-10 ${index % 2 === (Math.floor(index / 4) % 2 === 0 ? 0 : 1)
                                    ? 'text-brown-200'
                                    : 'opacity-0'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}