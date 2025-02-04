'use client'
import { use, useEffect, useState } from 'react';
import { setGuestCookies, submitUTM } from '@/lib/actions/guest';
import { useSearchParams } from 'next/navigation';
import { UTM } from '@/types/types';

type GuestSession = {
    guest_token: string,
    cart_id: string
}

const setCookies = async (inputSession: GuestSession) => {
    await setGuestCookies(inputSession);
}

export function CookieInitializer({ sessionPromise }: { sessionPromise: Promise<GuestSession> }) {
    const searchParams = useSearchParams();
    const [prevPromoCode, setPrevPromoCode] = useState('');
    const utm: UTM = {
        utm_source: searchParams.get('utm_source') as string,
        utm_medium: searchParams.get('utm_medium') as string,
        utm_campaign: searchParams.get('utm_campaign') as string,
        utm_content: searchParams.get('utm_content') as string,
        utm_term: searchParams.get('utm_term') as string
    }
    const [previousUtm, setPreviousUtm] = useState<UTM>({
        utm_source: '',
        utm_medium:'',
        utm_campaign: '',
        utm_content: '',
        utm_term: ''
    });
    const promocode = searchParams.get('promo') as string;
    const [commited, setCommited] = useState(false);
    const session = use(sessionPromise);

    useEffect(() => {
        setCookies(session);
    }, []);

    useEffect(() => {
        const hasNonEmptyValuesAndChanged = Object.keys(utm).some(key  => {
            const typedKey = key as keyof typeof utm;
            const currentValue = utm[typedKey];
            const previousValue = previousUtm[typedKey];
            // Check if current value is not empty and different from previous state
            return currentValue !== '' && currentValue !== previousValue;
        });
        setPreviousUtm(utm);
        // Check if any of the UTM parameters have changed or have not been commited yet
        if ( hasNonEmptyValuesAndChanged || !commited) {
            setCommited(true);
            submitUTM(utm);
        }
        if (promocode.length !== 0 && promocode !== prevPromoCode) {
            setPrevPromoCode(promocode);
            // TO DO: call a server action to track promocode
        }
    }, [searchParams]);

    return null;
}
