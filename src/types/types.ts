export interface TMenu {
    meals: TMeal[],
}

export type TMeal = {
    src: string,
    title: string,
    subtitle?: string,
    description?: string,
    price: number,
    alt: string,
}

