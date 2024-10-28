import { LogoIcon } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import IKImage from "@/lib/IKImage";
import { ArrowRightIcon } from "lucide-react";

export default function PromoBanner() {

  
    return (
        <section className="h-80 rounded-3xl bg-brown-100 w-full max-w-7xl flex justify-between gap-12 my-12 mx-auto overflow-clip">
            <div className="h-full w-2/5 relative">
                <IKImage 
                    src='packaging/mockup-4.png'
                    alt='packaged mamanpaz meal'
                    fill
                    className="object-cover"
                    sizes="33vw"
                />
            </div>
            <div className="h-full flex flex-col justify-center items-start max-w-sm gap-10">
                <h2 className="font-semibold text-4xl text-pretty">Get <span className="italic font-bold">20% OFF</span> on your monthly plan</h2>
                <Button className="rounded-full">See Plans <ArrowRightIcon /></Button>
            </div>

            {/*-----Background Patterns-----*/}
            <div className="self-center grid grid-cols-4 gap-x-8 px-4">
                {Array.from({length : 44}).map((_,index)=>(
                    <LogoIcon 
                        key={index}
                        className={`h-10 ${
                            index % 2 === (Math.floor(index / 4) % 2 === 0 ? 0 : 1) 
                            ? 'text-brown-200'
                            : 'opacity-0'
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}