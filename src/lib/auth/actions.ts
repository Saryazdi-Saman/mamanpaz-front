'use server'
import { cookies } from "next/headers";

export async function createGuestSession(
    sessionType: "guest" | "user",
    token: string
) {
    console.log("createGuestSession");
    console.log("sessionType");
    console.log(sessionType);
    console.log("token");
    console.log(token);
    const expiresInOneWeek = new Date(Date.now() + 7* 24 * 60 * 60 * 1000);
    (await cookies()).set(`${sessionType}_session`, token, {
        expires: expiresInOneWeek,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    });
    return 
}