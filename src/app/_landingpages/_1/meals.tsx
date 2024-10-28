import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import PreviewMeals from "./components/meals/previewMeals";

export default function Meals() {
    return (
        <section className="px-4 py-16 sm:px-16 sm:py-24">
            <header className="mx-auto text-center
            sm:flex sm:justify-between sm:items-center sm:max-w-7xl sm:text-start">
                <h1 className="font-medium text-4xl sm:text-5xl">Choose from <span className="font-bold italic">20+</span> weekly <span className="font-bold italic">options</span></h1>
                <Button variant='outline' className="rounded-full hidden sm:flex">Choose your Menu <ArrowRightIcon /></Button>
            </header>
            <PreviewMeals />
            <Button variant='outline' className="rounded-full sm:hidden flex w-full">Choose your Menu <ArrowRightIcon /></Button>
            
        </section>
    )
}