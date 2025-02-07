import { Logo } from "@/assets/svg";
import { Separator } from "@/components/ui/separator";
import { NAV_ITEMS } from "../_navbar/navItems";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Footer() {
    return (
        <>
            {/* <Separator className="w-full lg:w-[calc(100%-4rem)] lg:mx-auto bg-blue-50 h-px" /> */}
            <footer className="w-full flex flex-col items-center gap-6 px-28 ">
                <Logo className='w-36 pt-6 -mb-3' />
                <ul className="w-full flex items-center justify-center flex-row flex-wrap gap-2 ">
                    {NAV_ITEMS.map((item, index) => (
                        <li key={index} className="flex-grow-0 flex-shrink-0">
                            <Link
                                href={item.href}
                                className={
                                    buttonVariants({
                                        variant: 'link',
                                        size: 'sm',
                                        className: "font-normal text-lg text-blue-400"
                                    })}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Separator className=" bg-blue-50 h-px w-full lg:w-full" />
                <div className="pb-6 flex
                flex-col w-full justify-start items-center
                lg:flex-row lg:w-full lg:justify-between lg:items-baseline">
                    <p className="text-base text-blue-400 leading-6">&copy; 2024 MamanpazMeals. All rights reserved</p>
                    <ul className="flex">
                        <li>
                            <Link
                                href="#"
                                className={
                                    buttonVariants({
                                        variant: 'link',
                                        size: 'sm',
                                        className: "font-normal text-base text-blue-300"
                                    })}>
                                Terms
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={
                                    buttonVariants({
                                        variant: 'link',
                                        size: 'sm',
                                        className: "font-normal text-base text-blue-300"
                                    })}>
                                privacy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={
                                    buttonVariants({
                                        variant: 'link',
                                        size: 'sm',
                                        className: "font-normal text-base text-blue-300"
                                    })}>
                                Cookies
                            </Link>
                        </li>
                    </ul>
                </div>

            </footer >
        </>
    )
}