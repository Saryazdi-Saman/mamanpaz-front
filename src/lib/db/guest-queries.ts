import 'server-only'

type GuestSessionOutput = {
    guest_token: string;
    cart_id: string;
}

type CartResponse = {
    success?: {
        message: string
    },
    error?: {
        message: string
    }
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

export async function getGuest({
    guestToken,
    cartId
}: {
    guestToken: string | undefined,
    cartId: string | undefined
}): Promise<GuestSessionOutput> {
    const { token, cart_id } = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest`, {
        method: "POST",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: guestToken,
            cart_id: cartId
        })
    }).then((res) => res.json());
    return { guest_token: token, cart_id };
}

export async function getGuestSession({
    guestToken,
    cartId
}: {
    guestToken: string | undefined,
    cartId: string | undefined
}): Promise<GuestSessionOutput> {
    if (guestToken && cartId) {
        return await getGuest({ guestToken, cartId });
    }
    else {
        return await createGuest();
    }
}

export async function addPlanToCart({
    guestToken,
    cartId,
    meal_plan_variant,
    delivery_schedule_variant
}: {
    guestToken: string,
    cartId: string,
    meal_plan_variant: string,
    delivery_schedule_variant: string
}): Promise<CartResponse> {
    if (!guestToken || !cartId) {
        return {
            error: {
                message: "Missing guest token or cart id"
            }
        }
    }
    const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest/cart/${cartId}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: guestToken,
            meal_plan_variant,
            delivery_schedule_variant
        })
    })
    
    if (!result.ok) {
        return {
            error: {
                message: "Something went wrong"
            }
        }
    }
    return {
        success: {
            message: "Successfully added to cart"
        }
    }
}