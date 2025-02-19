import { HttpTypes } from '@medusajs/types'
import 'server-only'

export async function createGuest(): Promise<string> {
    const {id} = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guests`, {
        method: "POST",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            "Content-Type": "application/json"
        },
        cache: "no-store"
    }).then((res) => res.json())
    return id
}

export async function getCart(id: string): Promise<HttpTypes.StoreCart | undefined> {
    const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guests/${id}/cart`, {
        method: "GET",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
        },
    })
    if (!result.ok) {
        return undefined
    }
    const { cart }:{cart: HttpTypes.StoreCart } = await result.json();
    return cart;
}

export async function addPlanToGuestCart({
    guestId,
    variantId
}: {
    guestId: string,
    variantId: string
}): Promise<string>{
    const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guests/add-plan-to-cart`, {
        method: "POST",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            variant_id: variantId,
            guest_id: guestId,
        }),
        cache: "no-cache"
    })

    const {token} = await result.json() as {token: string}

    return token
}

//     guestToken,
//     cartId,
//     meal_plan_variant,
//     delivery_schedule_variant
// }: {
//     guestToken: string,
//     cartId: string,
//     meal_plan_variant: string,
//     delivery_schedule_variant: string
// }): Promise<CartResponse> {
//     if (!guestToken || !cartId) {
//         return {
//             error: {
//                 message: "Missing guest token or cart id"
//             }
//         }
//     }
//     const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest/cart/${cartId}`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//             "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             token: guestToken,
//             meal_plan_variant,
//             delivery_schedule_variant
//         })
//     })
    
//     if (!result.ok) {
//         return {
//             error: {
//                 message: "Something went wrong"
//             }
//         }
//     }
//     return {
//         success: {
//             message: "Successfully added to cart"
//         }
//     }
// }s