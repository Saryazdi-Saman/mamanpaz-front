'use server'

import { cookies } from "next/headers";
import { addPlanToCart, createGuest, getGuest, getGuestCart } from "../db/guest-queries";
import { HttpTypes } from "@medusajs/types";

export async function setGuestCookies({
    guest_token,
    cart_id
}: {
    guest_token: string,
    cart_id: string
}) {
    const cookieStore = await cookies();
    cookieStore.set("guest_session", guest_token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30
    });
    cookieStore.set("cart_id", cart_id, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30
    });
    return
}

export async function getCart() {
    const cookieStore = await cookies();
    const guestToken = cookieStore.get('guest_session')?.value;
    const cartId = cookieStore.get('cart_id')?.value;
    if (!guestToken || !cartId) {
        
        const { guest_token, cart_id } = await createGuest();
        
        const cart = await getGuestCart({ cart_id });

        return {
            guest_token,
            cart_id,
            cart
        }
    } else {
        const { guest_token, cart_id } = await getGuest({ token: guestToken });

        const cart = await getGuestCart({ cart_id });

        return {
            guest_token,
            cart_id,
            cart
        }
    }
}

export async function updateCart(
    prevState: HttpTypes.StoreCart, 
    variant_id: string,
){
    const cookieStore = await cookies();
    const guestToken = cookieStore.get('guest_session')?.value;
    const cartId = cookieStore.get('cart_id')?.value;

    if (guestToken && cartId) {

        const result = await addPlanToCart(variant_id, cartId);
        console.log("LOGGING FROM GUEST ACTIONS...")
        console.log("UPDATE CART...")
        console.log(result)
    } else {

        const { guest_token, cart_id } = await createGuest();

        cookieStore.set("guest_session", guest_token, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30
        });

        cookieStore.set("cart_id", cart_id, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30
        });

        await addPlanToCart(variant_id, cart_id);
    }
}

// export async function updateMealPlan(
//     prevState: any,
//     data: {
//         cart_id: string,
//         variant_id: string
//     }
// ) {
//     console.log("updateMealPlan")
//     const cookieHeader = (await cookies()).get('guest_session')?.value;
//     if (!cookieHeader) {
//         return "Error updating plan's meal count";
//     }

//     try {
//         await addPlanToCart(
//             data.variant_id,
//             data.cart_id
//         );
//         // revalidateTag('guest_session');
//     } catch (error) {
//         return "Error updating plan's meal count";
//     }
// }