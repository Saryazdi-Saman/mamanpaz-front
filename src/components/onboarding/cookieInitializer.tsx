'use client'
import { use, useEffect } from 'react';
import { setGuestCookies } from '@/lib/actions/guest';

type GuestSession = {
    guest_token: string,
    cart_id: string
}

export function CookieInitializer({ sessionPromise }: { sessionPromise: Promise<GuestSession> }) {
    const session = use(sessionPromise);
    useEffect(() => {
        const setCookies = async (inputSession: GuestSession) => {
            await setGuestCookies(inputSession);
        }
        setCookies(session);
    }, []);

    return null;
}
