import 'server-only'
import { Guest } from "@/types/types";
import { headers } from "next/headers";

export async function getGuest(): Promise<Guest> {
    const reqHeaders = new Headers(await headers());
    reqHeaders.set("x-publishable-api-key", `${process.env.MEDUSA_PUBLIC_KEY}`);
    // const userCookie = (await cookies()).get("user_session");
    const { guest } = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest`, {
        method: "GET",
        credentials: "include",
        headers: reqHeaders,
        next: {
            tags: ['guest_session']
        }
    }).then((res) => res.json());
    return guest;
}

export async function updateGuestSession({
    token,
    updates
}: {
    token: string,
    updates: Partial<Guest>
}): Promise<Response> {
    const reqHeaders = new Headers();
    reqHeaders.set("x-publishable-api-key", `${process.env.MEDUSA_PUBLIC_KEY}`);
    reqHeaders.set("Content-Type", "application/json");
    reqHeaders.set("Cookie", `guest_session=${token}`);
    
    const data = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest`, {
        method: "PUT",
        credentials: "include",
        headers: reqHeaders,
        body: JSON.stringify({updates}),
    })
    return data;
}