'use server'

import { cookies } from "next/headers";
import { addPlanToGuestCart, createGuest } from "../db/guest-queries";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";
// import { AddToCartInput, OnboardingStage } from "@/types/onboarding";
// import { UTM } from "@/types/types";
// import { submitGuestVisit } from "../db/utm";

export async function setGuest(): Promise<void> {
    const guestId = await createGuest();
    const cookieStore = await cookies();
    cookieStore.set('guest_session', guestId, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30
    })
    return
}

export async function addToCartAction(
    prevState: any,
    selectedVariantId: string | undefined
) {
    if (!selectedVariantId) {
        return 'Error adding plan to cart'
    }

    const cookieStore = await cookies();
    const guestId = cookieStore.get('guest_session')?.value ?? (await createGuest())

    try {
        const token = await addPlanToGuestCart({
            guestId,
            variantId: selectedVariantId,
        })
        cookieStore.set('guest_session', token, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30
        })
    } catch {
        return 'Error adding item to cart'
    }

    redirect('/sign-up')
}

// export async function submitUTM(utm: UTM) {
//     const headerList = await headers()
//     const cookieStore = await cookies();
//     const userAgent = headerList.get('user-agent') as string;
//     const referer = headerList.get('referer') as string;
//     const origin = headerList.get('origin') as string;
//     const xForwardedFor = headerList.get('x-forwarded-for') as string;
//     const reqHeaders = {
//         user_agent: userAgent,
//         referer: referer,
//         origin: origin,
//         ip_address: xForwardedFor
//     };
//     let guestToken = cookieStore.get('guest_session')?.value;
//     if (!guestToken) {
//         console.error("Could not submit UTM data, guest token is not set")
//         return
//     }
//     await submitGuestVisit({utm, headerObject:reqHeaders, guestToken});
//     return
// }