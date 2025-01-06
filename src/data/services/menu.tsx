import { TMeal, TMenu } from "@/types/types"

export async function getMenuDates() {
    console.log("getting menu dates")

    const availableMenus = {
        current: ['2023-04-01'],
        upcomming: ['2023-04-08', '2023-04-15', '2023-04-22', '2023-04-29'],
        past: ['2023-03-01', '2023-03-08']
    }

    return availableMenus
}

export async function getMeals(date: string | undefined) {
    console.log("getting meals for date", date)
    let meals: TMeal[] = []
    meals = [
        {
            title: 'Ghormeh Sabzi',
            alt: 'image 1',
            description: 'A fragrant herb stew made with slow-cooked lamb and kidney beans',
            src: 'meals/ghormeh-sabzi-2.jpg',
            price: 0
        },
        {
            title: 'Fesenjan',
            alt: 'image 2',
            description: 'A rich and tangy pomegranate walnut stew with tender chicken',
            src: 'meals/fesenjan.jpg',
            price: 0
        },
        {
            title: 'Chelo Kabab',
            alt: 'image 3',
            description: 'Juicy grilled beef or chicken kabobs, served with fluffy saffron rice',
            src: 'meals/khorak-e-meigoo.jpg',
            price: 0
        },
        {
            title: 'Zereshk Polo',
            description: 'Barberry rice with golden chicken, delicately seasoned and full of flavor.',
            src: 'meals/zereshk-polo-morgh-ran.jpg',
            alt: 'image 4',
            price: 0
        },
        {
            title: 'Albaloo Polo',
            description: 'A fragrant herb stew made with slow-cooked lamb and kidney beans',
            src: 'meals/albaloo-polo.jpg',
            alt: 'image 5',
            price: 0
        },
        {
            title: 'Ghalyieh Mahi',
            description: 'A rich and tangy pomegranate walnut stew with tender chicken',
            src: 'meals/ghaliye-mahi.jpg',
            alt: 'image 6',
            price: 0
        },
        {
            title: 'Bozghormeh',
            description: 'Juicy grilled beef or chicken kabobs, served with fluffy saffron rice',
            src: 'meals/bozghormeh.jpg',
            alt: 'image 7',
            price: 0
        },
        {
            title: 'Gheimeh Bademjan',
            description: 'Barberry rice with golden chicken, delicately seasoned and full of flavor.',
            src: 'meals/khoresht-e-bademjan.jpg',
            alt: 'image 8',
            price: 0
        },

    ];
    if (!date) {
    }
    const menu: TMenu = {
        meals: meals
    }
    return menu
}