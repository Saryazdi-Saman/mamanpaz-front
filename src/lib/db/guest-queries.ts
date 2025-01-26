import 'server-only'
import { HttpTypes } from "@medusajs/types"

type GuestSessionOutput = {
    guest_token: string;
    cart_id: string;
}
export async function createGuest(): Promise<GuestSessionOutput> {
    const { token, cart_id } = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest`, {
        method: "GET",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
        },
    }).then((res) => res.json());
    return { guest_token: token, cart_id };
}

export async function getGuestCart({
    cart_id
}: {
    cart_id: string
}): Promise<HttpTypes.StoreCart> {
    const { cart } = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/carts/${cart_id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
        },
    }).then((res) => res.json());
    return cart;
}


export async function getGuest({
    token
}: {
    token: string
}): Promise<GuestSessionOutput> {

    const response = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest/${token}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
        },
    })

    if (!response.ok) {
        const { guest_token, cart_id } = await createGuest();
        return { guest_token, cart_id };
    }

    const { cart_id } = await response.json();
    return { guest_token: token, cart_id };
}


export async function addPlanToCart(variants: string[], cart_id: string): Promise<HttpTypes.StoreCart> {
    const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest/cart/${cart_id}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            variants,
        })
    })
        .then((res) => res.json());
    return result;
}

// ///////////////// UNVERIFIED FUNCTIONS /////////////////
// export async function updateGuestSession({
//     token,
//     updates
// }: {
//     token: string,
//     updates: Partial<HttpTypes.StoreCart>
// }): Promise<Response> {
//     const reqHeaders = new Headers();
//     reqHeaders.set("x-publishable-api-key", `${process.env.MEDUSA_PUBLIC_KEY}`);
//     reqHeaders.set("Content-Type", "application/json");
//     reqHeaders.set("Cookie", `guest_session=${token}`);

//     const data = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest`, {
//         method: "PUT",
//         credentials: "include",
//         headers: reqHeaders,
//         body: JSON.stringify({ updates }),
//     })
//     return data;
// }