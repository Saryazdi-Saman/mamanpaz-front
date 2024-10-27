import Image from "next/image"
import meal1 from "@/assets/placeholders/food-1.png"
import meal2 from "@/assets/placeholders/food-2.png"
import meal3 from "@/assets/placeholders/food-3.png"
import meal4 from "@/assets/placeholders/food-4.png"
import meal5 from "@/assets/placeholders/food-5.png"
import meal6 from "@/assets/placeholders/food-6.png"
import meal7 from "@/assets/placeholders/food-7.png"
import meal8 from "@/assets/placeholders/food-8.png"

const mealImages = {
    '1': meal1,
    '2': meal2,
    '3': meal3,
    '4': meal4,
    '5': meal5,
    '6': meal6,
    '7': meal7,
    '8': meal8,
}

export default function MealCard({
    meal
}: {
    meal: {
        id: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8',
        name: string,
        description: string,
        src: string,
        alt: string
    }
}) {
    return (
        <article className="w-80 h-fit flex flex-col justify-start gap-4">
            <div className="h-96 relative w-full rounded-lg overflow-clip">
                <Image
                    src={mealImages[meal.id]}
                    alt={meal.alt}
                    fill
                    className="rounded-lg object-cover"
                />
            </div>
            <header className="space-y-1.5 h-fit flex-shrink-0">
                <h3 className="font-body text-2xl font-bold">{meal.name}</h3>
                <p className="text-lg text-blue-400">{meal.description}</p>
            </header>
        </article>
    )
}