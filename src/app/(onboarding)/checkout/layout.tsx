import ScrollToTop from "@/components/ui/scroll-to-top";
import { getCart, getGuest } from "@/lib/db/guest-queries";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AccountInfo } from "@/components/onboarding/checkout/account-info";
import OrderSummary from "@/components/onboarding/checkout/order-summary";
import Link from "next/link";

export default async function CheckoutLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const cartID = (await cookies()).get('cart_id')?.value;
    const guestToken = (await cookies()).get('guest_session')?.value;
    if (!cartID || !guestToken) {
        redirect('/pricing')
    }
    const cart = getCart(cartID);
    const guest = getGuest(guestToken);
    
    return (
        <div className="min-h-screen px-2 md:px-4 py-8 md:py-16 lg:py-18 lg:px-16 w-full bg-teal-50 flex flex-col items-center gap-4 sm:gap-16 sm:flex-row-reverse sm:items-start">
            <ScrollToTop />
            <OrderSummary cartPromise={cart} />
            <div className="flex flex-col gap-y-4 w-full">
                <AccountInfo guestPromise={guest} />
                {children}
                <p className="text-pretty px-2 py-10">
                    PLAN DETAILS: By clicking &quot;Place Order&quot;, you agree you are purchasing a continuous subscription and will receive weekly deliveries billed to your designated payment method until you cancel. Pricing is based on your plan choices available in you Plan Settings page and is subject to change. Cancel at any time through Plan settings page. Any orders identified as &quot;Processing&quot; or &quot;Shipped&quot; on your Upcoming page, however, cannot be cancelled. For more information see our <Link href="/pages/terms" className="text-blue-500 underline">Terms of Service</Link>.</p>
            </div>
        </div>
    )
}