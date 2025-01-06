import { TMenu} from "@/types/types";
import { AnimatedGroup } from "@/components/motion/animatedGroup";
import MealPreviewCard from "./mealPreviewCard";

export default function PreviewMeals({
    menu,
}: {
    menu: TMenu,
}) {
    return (
            <AnimatedGroup
                // className='flex flex-wrap gap-6 w-full min-h-screen justify-evenly items-start relative'
                className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 w-full'
                variants={{
                    container: {
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    },
                    item: {
                        hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                        visible: {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            transition: {
                                duration: 2,
                                type: 'spring',
                                bounce: 0.3,
                            },
                        },
                    },
                }}
            >
                {menu.meals.map((meal, index) => (
                        <MealPreviewCard
                            meal={meal}
                            key={index}
                        />
                ))}
            </AnimatedGroup>
    )
}