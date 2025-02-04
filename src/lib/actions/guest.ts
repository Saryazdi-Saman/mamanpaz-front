'use server'

import { cookies, headers } from "next/headers";
import { addPlanToCart, createGuest } from "../db/guest-queries";
import { redirect } from "next/navigation";
import { AddToCartInput, OnboardingStage } from "@/types/onboarding";
import { UTM } from "@/types/types";
import { submitGuestVisit } from "../db/utm";

export async function setGuestCookies({
    guest_token,
    cart_id,
    progress_step
}: {
    guest_token?: string,
    cart_id?: string
    progress_step?: OnboardingStage
}) {
    const cookieStore = await cookies();
    const currentStep = cookieStore.get("progress_step")?.value;
    const nextStep = progress_step ?? currentStep ?? OnboardingStage.INITIAL;
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
    { meal_plan_variant, delivery_schedule_variant }: AddToCartInput
) {
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
                error: { message: "Something went wrong" }
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
            error: { message: "Something went wrong" }
        }
    }
    redirect("/sign-up")
}

export async function submitUTM(utm: UTM) {
    const headerList = await headers()
    const cookieStore = await cookies();
    const userAgent = headerList.get('user-agent') as string;
    const referer = headerList.get('referer') as string;
    const origin = headerList.get('origin') as string;
    const xForwardedFor = headerList.get('x-forwarded-for') as string;
    const reqHeaders = {
        user_agent: userAgent,
        referer: referer,
        origin: origin,
        ip_address: xForwardedFor
    };
    let guestToken = cookieStore.get('guest_session')?.value;
    if (!guestToken) {
        console.error("Could not submit UTM data, guest token is not set")
        return
    }
    await submitGuestVisit({utm, headerObject:reqHeaders, guestToken});
    return
}