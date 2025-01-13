'use server'
import { cookies } from "next/headers";

type NewUser = {
    type: "guest" | "user";
    token: string;
    expiry: Date;
}
export async function setSession(user: NewUser) {
    (await cookies()).set(user.type, user.token, {
        expires: user.expiry,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    } ) 
}