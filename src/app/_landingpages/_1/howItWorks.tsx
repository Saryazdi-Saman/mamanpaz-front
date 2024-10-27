import { HotMealIcon, MealsBookIcon, PlansIcon } from "@/assets/svg";
import { ReactNode } from "react";

// Define a type for our step items
type Step = {
  icon: ReactNode;
  title: string;
  description: string;
};

// Create an array of steps
const steps: Step[] = [
  {
    icon: <PlansIcon className="h-16"/>,
    title: "Choose Your Plan",
    description: "Pick a meal plan that suits your needs. Pick from the 3 amazing plans.",
  },
  {
    icon: <MealsBookIcon className="h-16"/>,
    title: "Select Your Meals",
    description: "Browse our weekly menu filled with traditional Persian dishes and pick your favorites.",
  },
  {
    icon: <HotMealIcon className="h-16"/>,
    title: "Heat, Eat, and Enjoy",
    description: "Receive your meals at your door, heat them up and enjoy! no prep, no mess!",
  },
];

export default function HowItWorks() {
    return (
            <section className="flex flex-col gap-16 justify-start items-center px-16 pt-16 pb-24 snap-top">
                <h1 className="text-5xl font-medium">How it <span className="italic font-bold">really</span> works?</h1>
                <ul className="grid auto-cols-fr grid-flow-col gap-24 items-baseline">
                    {steps.map((step, index) => (
                        <li key={index} className="flex flex-col items-start justify-start gap-6 max-w-72">
                            {step.icon}
                            <h2 className="font-bold text-3xl">{step.title}</h2>
                            <p className="text-lg text-blue-400">{step.description}</p>
                        </li>
                    ))}
                </ul>
            </section>
    )
}
