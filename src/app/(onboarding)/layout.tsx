import Footer from "./_footer/footer";
import Navbar from "./_navbar/navbar";
import { cookies } from "next/headers";
import { getGuestSession } from "@/lib/db/guest-queries";
import { CookieInitializer } from "../../components/onboarding/cookieInitializer";
import { Suspense } from "react";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
    const guestTokenCookie = (await cookies()).get('guest_session')?.value;
    const cartIdCookie = (await cookies()).get('cart_id')?.value;

    const session = getGuestSession({
        guestToken: guestTokenCookie,
        cartId: cartIdCookie
    });

    return (
        <section className="flex flex-col min-h-screen">
            <Navbar />
            <Suspense >
                <CookieInitializer sessionPromise={session} />
            </Suspense>
            {children}
            <Footer />
        </section>
    );
}