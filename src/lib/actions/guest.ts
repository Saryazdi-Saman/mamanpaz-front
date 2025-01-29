'use server'

import { cookies } from "next/headers";
import { addPlanToCart, createGuest } from "../db/guest-queries";
import { redirect } from "next/navigation";
import { AddToCartInput, OnboardingStage } from "@/types/onboarding";

export async function setGuestCookies({
    guest_token,
    cart_id,
    progress_step
}: {
    guest_token?: string,
    cart_id?: string
    progress_step?: OnboardingStage
}) {
    const nextStep = progress_step ?? OnboardingStage.INITIAL;
    const cookieStore = await cookies();
    if (guest_token) {
        cookieStore.set("guest_session", guest_token, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30
        });
    }

    if (cart_id) {
        cookieStore.set("cart_id", cart_id, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30
        });
    }

    cookieStore.set("progress_step", nextStep, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30
    });
    return
}
type AddToCartState = {
    error?: {
        message: string
    }
}

export async function addToCart(
    prevState: AddToCartState | null,
    {meal_plan_variant, delivery_schedule_variant}: AddToCartInput
) {
    console.log("meal_variant", meal_plan_variant);
    console.log("delivery_variant", delivery_schedule_variant);
    const cookieStore = await cookies();
    let guestToken = cookieStore.get('guest_session')?.value;
    let cartId = cookieStore.get('cart_id')?.value;

    if (!guestToken || !cartId) {
        const { guest_token, cart_id } = await createGuest();
        guestToken = guest_token;
        cartId = cart_id;
    }
    try {
        const { error } = await addPlanToCart({
            guestToken,
            cartId,
            meal_plan_variant,
            delivery_schedule_variant
        });
        if (error) {
            return {
                error: {message: "Something went wrong"}
            }
        }

        // TO DO: ADD Redirect
        setGuestCookies({
            guest_token: guestToken,
            cart_id: cartId,
            progress_step: OnboardingStage.CREDENTIALS
        })

    } catch {
        return {
            error: {message: "Something went wrong"}
        }
    }
    redirect("/sign-up")
}