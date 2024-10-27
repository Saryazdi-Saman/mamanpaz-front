import { Button, buttonVariants } from "@/components/ui/button";
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
        <div className="ml-10 hidden lg:flex lg:items-center">
            <ul className="flex items-center">
                {
                    NAV_ITEMS.map((item, index) => (
                        <li key={index}>
                            {/* <Button variant='ghost' size='sm' className="font-normal">
                                <Link
                                    href={item.href}
                                    className="hover:text-primary transition-colors">
                                    {item.name}
                                </Link>
                            </Button> */}
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
            </ul>
        </div>
    )
}