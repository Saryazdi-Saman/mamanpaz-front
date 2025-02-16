import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import PreviewMeals from "./components/meals/previewMeals";
import Link from "next/link";

export default function Meals() {
    return (
        <section className="px-4 py-16 md:px-0 xl:px-16 lg:py-24 flex flex-col items-center">
            <header className="mx-auto text-center w-full">
                <h1 className="font-medium text-4xl lg:text-5xl">Choose from <span className="font-bold italic">20+</span> weekly <span className="font-bold italic">options</span></h1>

            </header>
            {/* <header className="mx-auto text-center w-full
            lg:flex lg:justify-between lg:items-center lg:text-start">
                <h1 className="font-medium text-4xl lg:text-5xl">Choose from <span className="font-bold italic">20+</span> weekly <span className="font-bold italic">options</span></h1>
                <Button variant='outline' className="rounded-full hidden lg:flex">Choose your Menu <ArrowRightIcon /></Button>
            </header> */}
            <PreviewMeals />
            <Button variant='outline' className="rounded-full w-full md:w-fit" asChild>
                <Link href="/on-the-menu">
                    Choose your Menu <ArrowRightIcon />
                </Link>
            </Button>

        </section >
    )
}