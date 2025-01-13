import 'server-only'
import { Guest } from "@/types/types";
import { cookies, headers } from "next/headers";

export async function getGuest(): Promise<Guest | null> {
    const reqHeaders = new Headers(await headers());
    reqHeaders.set("x-publishable-api-key", `${process.env.MEDUSA_PUBLIC_KEY}`);
    const userCookie = (await cookies()).get("user_session");
    // const guestCookie = (await cookies()).get("guest_session");
    if (userCookie && userCookie.value) {
        return null;
    } else {
        // const token = guestCookie?.value;
        let { guest } = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest`, {
            method: "GET",
            credentials: "include",
            headers: reqHeaders,
        }).then((res) => res.json());
        return guest;
    }
}