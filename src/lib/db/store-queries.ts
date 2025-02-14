import { DeliverySchedule, Plan, ProductWithPricing } from "@/types/types";
import { CalculatedPriceSet, CalculatedPriceSetDTO, PriceDTO, ProductDTO, ProductOptionDTO, ProductVariantDTO } from "@medusajs/types";
type PlanData = {
    title: string,
    handle: string,
    id: string,
    variants: ProductVariantDTO[],
    options: ProductOptionDTO[]
}
export async function getAvailablePlans(): Promise<PlanData[]> {
    const categorySearchParams = new URLSearchParams({
        q: "Plans",
    })

    const categoriesResponse = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/product-categories?${categorySearchParams.toString()}`,
        {
            credentials: "include",
            headers: {
                "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            },
            next: {
                tags: ['available_plans']
            }
        })
    const { product_categories } = await categoriesResponse.json()

    const categoryProductSearchParams = new URLSearchParams({
        "category_id": product_categories[0].id,
    })

    const productsResponse = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/products?${categoryProductSearchParams.toString()}`, {
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
        },
        next: {
            tags: ['availbale_plans']
        }
    })

    const { products }: { products: ProductDTO[] } = await productsResponse.json()
    const plans = products.map((product) => {
        return {
            title: product.title,
            handle: product.handle,
            id: product.id,
            variants: product.variants,
            options: product.options,
        }
    })
    return plans
}

export async function getPlanVariants(
    handle: string
): Promise<ProductWithPricing | undefined> {
    const productsResponse = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/products?handle=${handle}`,
        {
            credentials: "include",
            headers: {
                "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            },
            next: {
                tags: ['available_plans']
            }
        })
    const {products} = await productsResponse.json()
    if (!products || products.length === 0) {
        return undefined
    }
    const id = products[0].id

    const queryParams = new URLSearchParams({
        fields: `*variants.calculated_price`,
    })

    const productWithPrices = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/products/${id}?${queryParams.toString()}`,
        {
            credentials: "include",
            headers: {
                "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            },
            next: {
                tags: ['available_plans']
            }
        })
    const {
        product
    }: {
        product: ProductWithPricing
    } = await productWithPrices.json()
    return product
}

export async function getAvailableDeliveryOptions(): Promise<DeliverySchedule[]> {
    const { delivery_options } = await fetch(`${ process.env.MEDUSA_BACKEND_URI } / store / delivery - options`, {
        method: "GET",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${ process.env.MEDUSA_PUBLIC_KEY }`,
        },
        next: {
            tags: ['delivery_options']
        }
    }).then((res) => res.json());
    return delivery_options;
}