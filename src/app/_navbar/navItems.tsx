import { buttonVariants } from "@/components/ui/button";
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
            lg:flex-row lg:h-fit lg:flex lg:gap-2 lg:pt-0 lg:pl-10">
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
                            className: "self-stretch rounded-full mt-10 lg:self-center lg:mt-0 lg:ml-auto",
                        })}>
                    Login
                </Link>
                <Link
                    href='#'
                    className={
                        buttonVariants({
                            size: 'sm',
                            className: 'self-stretch rounded-full lg:self-center'
                        })}>
                    Get Started
                </Link>
            </ul>
        </div>
    )
}