import { cn } from "@/lib/utils"

export const Marquee: React.FC<{reverse?:boolean, children: React.ReactNode }> = ({reverse = false, children }) => {
    return (
        <div className="w-full overflow-hidden z-10 ">
            <div className="relative w-full flex overflow-hidden py-5">
                <div className={cn("flex w-max animate-marquee [--duration:60s]",{
                    "direction-reverse": reverse,
                })}>
                    {children}
                    {children}
                </div>
            </div>
        </div>
    )
}