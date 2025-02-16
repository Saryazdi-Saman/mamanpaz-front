import { Card, CardContent, CardFooter } from "@/components/ui/card";
import IKImage from "@/lib/IKImage";
import { TMeal } from "@/types/types";

export default function MealPreviewCard({
    meal
}: {
    meal: TMeal,
}) {
    return (
        <Card className="rounded-none border-2 border-brown-400 shadow-brown-600 w-full">
            <div className="flex flex-col justify-start gap-4 h-full items-stretch">
                <CardContent className="w-full aspect-square relative" >
                    <IKImage
                        src={meal.src}
                        alt={meal.alt}
                        fill
                        className="object-cover"
                    />
                </CardContent>
                <CardFooter >
                    <h3 className="text-base font-medium capitalize leading-tight tracking-tight text-center">
                        {meal.title}
                    </h3>
                </CardFooter>
            </div>
        </Card>
    )
}