import IKImage from "@/lib/IKImage"

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
                <IKImage
                    src={meal.src}
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