import { Guest, GuestCredentials } from '@/types/onboarding';
import { redirect } from 'next/navigation';
import { HttpTypes } from '@medusajs/types'
import 'server-only'

// type GuestSessionOutput = {
//     guest_token: string;
//     cart_id: string;
// }

// type CartResponse = {
//     success?: {
//         message: string
//     },
//     error?: {
//         message: string
//     }
// }

// export async function getGuest(token: string): Promise<GuestCredentials> {
//     const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest/${token}`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//             "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
//         },
//     })
//     if (!result.ok) {
//         redirect('/pricing')
//     }
//     const { guest } = await result.json();
//     return {
//         email: guest.email,
//         phone_number: guest.phone_number,
//     };
// }

export async function createGuest(): Promise<string> {
    const {token} = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guests`, {
        method: "POST",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            "Content-Type": "application/json"
        },
        cache: "no-store"
    }).then((res) => res.json())
    return token
}

// export async function createGuest(): Promise<GuestSessionOutput> {
//     const { token, cart_id } = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//             "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
//         },
//     }).then((res) => res.json());
//     return { guest_token: token, cart_id };
// }

// export async function validateGuest({
//     guestToken,
//     cartId
// }: {
//     guestToken: string | undefined,
//     cartId: string | undefined
// }): Promise<GuestSessionOutput> {
//     const { token, cart_id } = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//             "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             token: guestToken,
//             cart_id: cartId
//         })
//     }).then((res) => res.json());
//     return { guest_token: token, cart_id };
// }

// export async function getGuestSession({
//     guestToken,
//     cartId
// }: {
//     guestToken: string | undefined,
//     cartId: string | undefined
// }): Promise<GuestSessionOutput> {
//     if (guestToken && cartId) {
//         return await validateGuest({ guestToken, cartId });
//     }
//     else {
//         return await createGuest();
//     }
// }

export async function getCart(token: string): Promise<HttpTypes.StoreCart | undefined> {
    const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guests/${token}/cart`, {
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
    guestToken,
    variantId
}: {
    guestToken: string,
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
            guest_token: guestToken,
        }),
        cache: "no-cache"
    })

    const {token} = await result.json() as {token: string}

    return token
}

// export async function addPlanToCart({
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
// }