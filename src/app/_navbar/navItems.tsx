import { Button, buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export const NAV_ITEMS = [
    {
        name: 'Menu',
        href: '/meals'
    },
    {
        name: 'Plans',
        href: '/plans',
    },
    {
        name: 'About',
        href: '/about'
    },
    {
        name: 'Contact',
        href: '/contact',
    },
    {
        name: 'FAQ',
        href: '/faq'
    },
]

export default function NavItems() {
    return (
        <div className="w-full">
            <input type='checkbox' className="peer hidden" id='navbar-open' />
            <ul className="hidden peer-checked:flex items-center gap-4 w-full flex-col h-[calc(100vh-2.75rem)] pt-10
            sm:flex-row sm:h-fit sm:flex sm:gap-2 sm:pt-0 sm:pl-10">
                {
                    NAV_ITEMS.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className={
                                    buttonVariants({
                                        variant: 'ghost',
                                        size: 'sm',
                                        className: "font-normal"
                                    })}>
                                {item.name}
                            </Link>
                        </li>
                    ))
                }
                <Link
                    href='#'
                    className={
                        buttonVariants({
                            variant: 'outline',
                            size: 'sm',
                            className: "self-stretch rounded-full mt-10 sm:self-center sm:mt-0 sm:ml-auto",
                        })}>
                    Login
                </Link>
                <Link
                    href='#'
                    className={
                        buttonVariants({
                            size: 'sm',
                            className: 'self-stretch rounded-full sm:self-center'
                        })}>
                    Get Started
                </Link>
            </ul>
        </div>
    )
}