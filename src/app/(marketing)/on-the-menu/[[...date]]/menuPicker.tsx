"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { FaRegCalendarAlt } from "react-icons/fa";
import { useMediaQuery } from 'usehooks-ts'
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"

type MenuDates = {
    current: string[],
    upcomming: string[],
    past: string[]
}

export function MenuPicker({ dates, selectedDate }: { dates: MenuDates, selectedDate: string }) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline"><FaRegCalendarAlt />{selectedDate}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Select a week</DialogTitle>
                    </DialogHeader>
                    <DatePicker dates={dates} selectedDate={selectedDate} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen} >
            <DrawerTrigger asChild>
                <Button variant="outline"><FaRegCalendarAlt />{selectedDate}</Button>
            </DrawerTrigger>
            <DrawerContent className="overflow-scroll">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Select a week</DrawerTitle>
                </DrawerHeader>
                <DatePicker className="px-4 pb-8" dates={dates} selectedDate={selectedDate} />
                {/* <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    )
}

function DatePicker({ className, dates, selectedDate }: { className?: string, dates: MenuDates, selectedDate: string }) {
    return (
        <div className={cn("flex flex-col justify-start items-start gap-4", className)}>
            {dates.current[0] !== selectedDate &&
                <Link href={'/on-the-menu'} className={buttonVariants({ variant: 'outline', size: 'sm', className: 'w-full' })}>{dates.current[0]}</Link>
            }
            {dates.upcomming.map((date, index) => (
                date !== selectedDate &&
                <Link href={`/on-the-menu/${date}`} key={index} className={buttonVariants({ variant: 'outline', size: 'sm', className: 'w-full' })}>{date}</Link>
            ))}
            <p className="font-semibold leading-tight">
                Previous weeks
            </p>
            {dates.past.map((date, index) => (
                date !== selectedDate &&
                <Link href={`/on-the-menu/${date}`} key={index} className={buttonVariants({ variant: 'outline', size: 'sm', className: 'w-full' })}>{date}</Link>
            ))}
        </div>
    )
}
