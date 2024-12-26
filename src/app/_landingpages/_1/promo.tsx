import { LogoIcon } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import IKImage from "@/lib/IKImage";
import { ArrowRightIcon } from "lucide-react";

export default function PromoBanner() {


    return (
        <section className="w-svw bg-teal-600 h-[27rem] flex justify-center overflow-clip relative flex-col items-start px-24 gap-10">
            <div className="grid grid-cols-12 w-full -mb-10 absolute bottom-0 left-0 z-0" aria-hidden='true'>
                {Array.from({ length: 48 }).map((_, index) => (
                    <LogoIcon
                        key={index}
                        className={`h-16 ${index % 2 === (Math.floor(index / 12) % 2 === 0 ? 0 : 1)
                            ? 'text-background/30'
                            : 'opacity-0'
                            }`}
                    />
                ))}
            </div>
            <h1 className="self-start text-4xl max-w-md font-medium leading-tight z-10">Get <span className="italic font-bold">20% OFF</span> on your monthly plan</h1>
            <Button className="z-10 rounded-lg">See Plans <ArrowRightIcon /></Button>
        </section>
    )
}