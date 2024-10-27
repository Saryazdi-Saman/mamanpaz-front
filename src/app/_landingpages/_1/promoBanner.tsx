import { BrownPatterns } from "@/assets/svg";
import Image from "next/image";
import MockupImage from "@/assets/mockup.png"
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function PromoBanner() {

  
    return (
        <section className="h-80 rounded-3xl bg-brown-100 w-full max-w-7xl flex justify-between overflow-clip gap-12 my-12 mx-auto">
            <div className="h-full w-2/5 relative">
                <Image
                    src={MockupImage}
                    alt="meal"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="h-full flex flex-col justify-center items-start max-w-sm gap-10">
                <h2 className="font-semibold text-4xl text-pretty">Get <span className="italic font-bold">20% OFF</span> on your monthly plan</h2>
                <Button className="rounded-full">See Plans <ArrowRightIcon /></Button>
            </div>
            <BrownPatterns />
        </section>
    )
}