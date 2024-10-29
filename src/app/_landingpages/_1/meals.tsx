import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import PreviewMeals from "./components/meals/previewMeals";

export default function Meals() {
    return (
        <section className="px-4 py-16 md-px-0 xl:px-16 lg:py-24">
            <header className="mx-auto text-center
            lg:flex lg:justify-between lg:items-center lg:max-w-7xl lg:text-start">
                <h1 className="font-medium text-4xl lg:text-5xl">Choose from <span className="font-bold italic">20+</span> weekly <span className="font-bold italic">options</span></h1>
                <Button variant='outline' className="rounded-full hidden lg:flex">Choose your Menu <ArrowRightIcon /></Button>
            </header>
            <PreviewMeals />
            <Button variant='outline' className="rounded-full lg:hidden flex w-full">Choose your Menu <ArrowRightIcon /></Button>
            
        </section>
    )
}