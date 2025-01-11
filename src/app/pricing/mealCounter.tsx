import { Button } from "@/components/ui/button";

export default function MealCounter() {
    return (
        <section className="bg-background py-10 px-4 md:px-14  grow">
                <h2 className="text-xl md:text-2xl font-bold">2. Select number of meals</h2>
                <div className="grid grid-cols-[2.5rem_2.5rem_2.5rem_2.5rem_auto] grid-rows-3 items-center justify-items-center py-4 gap-x-3">
                    <Button size="icon" className="font-black text-2xl h-8 w-8">-</Button>
                    <p className="text-2xl font-bold">1</p>
                    <Button size="icon" className="font-black text-2xl h-8 w-8">+</Button>
                    <p/>
                    <p className="justify-self-start">meals per day</p>
                    <p/>
                    <p className="font-light">7</p>
                    <p/>
                    <p/>
                    <p className="justify-self-start font-light">meals per week</p>
                    <p/>
                    <p className="font-light">$12.99</p>
                    <p/>
                    <p/>
                    <p className="justify-self-start font-light">per meal</p>
                </div>
        </section>
    )
}