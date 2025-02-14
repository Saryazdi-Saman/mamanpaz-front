import { TAGS } from "@/types/constants";
import { ProductWithPricing } from "@/types/types";
import { HttpTypes, ProductDTO, ProductOptionDTO, ProductVariantDTO } from "@medusajs/types";
import { cookies, headers } from "next/headers";
type PlanData = {
    title: string,
    handle: string,
    id: string,
    variants: ProductVariantDTO[],
    options: ProductOptionDTO[]
}

interface FetchError extends Error {
    status?: number;
    response?: Response;
}

type ExtractVariables<T> = T extends { variables: object }
    ? T['variables']
    : never;

export async function storeFetch<T>({
    customHeaders,
    query,
    body,
    method = "GET",
    tags,
    cache,
}: {
    customHeaders?: HeadersInit;
    query: string;
    body?: Record<string, any>;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    tags: string[],
    cache: "force-cache" | "no-store"
}): Promise<{ status: number; body: T } | never> {
    const reqHeaders = await headers()
    try {
        const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store${query}`, {
            method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
                "Authorization": reqHeaders.get('Authorization') || "",
                "Cookies": reqHeaders.get("Cookie") || "",
                ...customHeaders,
            },
            ...(method !== "GET" && body
                ? { body: JSON.stringify(body) }
                : {}),
            next: {
                tags: tags
            },
            cache,
        })

        if (!result.ok) {
            const error = new Error("API request failed") as FetchError;
            error.status = result.status;
            error.response = result;
            throw error;
        }

        const data = await result.json();
        return { status: result.status, body: data as T };

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`API Error: ${query} ${error.message}`);
        }
        throw new Error('Unknown API Error');
    }
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
            cache: "force-cache"
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
            tags: [TAGS.plan_categories]
        },
        cache: "force-cache"
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
                tags: [TAGS.plans]
            },
            cache: "force-cache"
        })
    const { products } = await productsResponse.json()
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
                tags: [TAGS.plans]
            },
            cache: "force-cache"
        })
    const {
        product
    }: {
        product: ProductWithPricing
    } = await productWithPrices.json()
    return product
}

// export async function getAvailableDeliveryOptions(): Promise<DeliverySchedule[]> {
//     const { delivery_options } = await fetch(`${ process.env.MEDUSA_BACKEND_URI } / store / delivery - options`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//             "x-publishable-api-key": `${ process.env.MEDUSA_PUBLIC_KEY }`,
//         },
//         next: {
//             tags: ['delivery_options']
//         }
//     }).then((res) => res.json());
//     return delivery_options;
// }

export async function getCart(): Promise<HttpTypes.StoreCart | undefined> {
    const cartId = (await cookies()).get('cartId')?.value;

    if (!cartId) {
        return undefined
    }
    try {
        const { body } = await storeFetch<{ cart: HttpTypes.StoreCart }>({
            query: `/store/carts/${cartId}`,
            tags: [TAGS.cart],
            cache: "no-store"
        })
        return body.cart
    } catch {
        return undefined
    }
}

export async function createCart(): Promise<HttpTypes.StoreCart> {
    const { body } = await storeFetch<{ cart: HttpTypes.StoreCart }>({
        query: '/store/carts',
        method: 'POST',
        tags: [],
        cache: "no-store"
    })
    return body.cart
}