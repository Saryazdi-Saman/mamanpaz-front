import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import PreviewMeals from "./components/meals/previewMeals";

export default function Meals() {
    return (
        <section className="px-16 py-24">
            <header className="flex justify-between items-center max-w-7xl mx-auto">
                <h1 className="font-medium text-5xl">Choose from <span className="font-bold italic">20+</span> weekly <span className="font-bold italic">options</span></h1>
                <Button variant='outline' className="rounded-full">Choose your Menu <ArrowRightIcon /></Button>
            </header>
            <PreviewMeals />
            
        </section>
    )
}