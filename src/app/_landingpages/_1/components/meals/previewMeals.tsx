// import { TMenu} from "@/lib/types";
// import { AnimatedGroup } from "@/components/motion-premitives/animatedGroup";
// import MealPreviewCard from "./mealPreviewCard";

// import { AnimatedGroup } from "../../../../../components/motion/animatedGroup"
import MealCard from "./mealCard";

type TMeal = {
    id: '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8',
    name: string,
    description: string,
    src: string,
    alt: string
}
const meals: TMeal[] = [
    {
        id: '1',
        name: 'Ghormeh Sabzi',
        alt: 'image 1',
        description: 'A fragrant herb stew made with slow-cooked lamb and kidney beans',
        src: 'meals/food-1.png'
    },
    {
        id: '2',
        name: 'Fesenjan',
        alt: 'image 2',
        description: 'A rich and tangy pomegranate walnut stew with tender chicken',
        src: 'meals/food-2.png'
    },
    {
        id: '3',
        name: 'Chelo Kabab',
        alt: 'image 3',
        description: 'Juicy grilled beef or chicken kabobs, served with fluffy saffron rice',
        src: 'meals/food-3.png'
    },
    {
        id: '4',
        name: 'Zereshk Polo',
        description: 'Barberry rice with golden chicken, delicately seasoned and full of flavor.',
        src: 'meals/food-4.png',
        alt: 'image 4',
    },
    {
        id: '5',
        name: 'Ghormeh Sabzi',
        description: 'A fragrant herb stew made with slow-cooked lamb and kidney beans',
        src: 'meals/food-5.png',
        alt: 'image 5',
    },
    {
        id: '6',
        name: 'Fesenjan',
        description: 'A rich and tangy pomegranate walnut stew with tender chicken',
        src: 'meals/food-6.png',
        alt: 'image 6',
    },
    {
        id: '7',
        name: 'Chelo Kabab',
        description: 'Juicy grilled beef or chicken kabobs, served with fluffy saffron rice',
        src: 'meals/food-7.png',
        alt: 'image 7',
    },
    {
        id: '8',
        name: 'Zereshk Polo',
        description: 'Barberry rice with golden chicken, delicately seasoned and full of flavor.',
        src: 'meals/food-8.png',
        alt: 'image 8',
    },
    
];

export default function PreviewMeals() {
    return (
            <div
                className='w-full mx-auto
                flex flex-col gap-6 py-10 items-center
                md:grid md:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] md:gap-y-11 md:gap-x-4 md:pt-11 md:max-w-7xl  md:justify-items-center
                lg:gap-x-10'
            >
                {meals.map((meal) => (
                    <MealCard
                        meal={meal}
                        key={meal.id}
                    />
                ))}
            </div>
            // <AnimatedGroup
            //     className='w-full mx-auto
            //     flex flex-col gap-6 py-10
            //     md:grid lg:grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] lg:gap-y-11 lg:gap-x-10 lg:pt-11 lg:max-w-7xl'
            //     variants={{
            //         container: {
            //             hidden: { opacity: 0 },
            //             visible: {
            //                 opacity: 1,
            //                 transition: {
            //                     staggerChildren: 0.05,
            //                 },
            //             },
            //         },
            //         item: {
            //             hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
            //             visible: {
            //                 opacity: 1,
            //                 y: 0,
            //                 filter: 'blur(0px)',
            //                 transition: {
            //                     duration: 1.2,
            //                     type: 'spring',
            //                     bounce: 0.3,
            //                 },
            //             },
            //         },
            //     }}
            // >
            //     {meals.map((meal) => (
            //         <MealCard
            //             meal={meal}
            //             key={meal.id}
            //         />
            //     ))}
            // </AnimatedGroup>
    )
}