
import { DeliveryInfo } from "@/components/onboarding/checkout/delivery-info";
import { getGuest } from "@/lib/db/guest-queries";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CheckoutDetailsPage() {
    const guestToken = (await cookies()).get('guest_session')?.value;
    if (!guestToken) {
        redirect('/pricing')
    }
    const guest = getGuest(guestToken);
    return (
        <>
            <DeliveryInfo guestPromise={guest} />
            <section className="w-full h-fit rounded-md border-2 border-blue-100 shadow-md bg-white py-10 sm:px-8 px-4">
                <h2 className="text-2xl font-bold">Billing Information</h2>
                {/* <AddressForm guestToken={guestToken} /> */}
            </section>
        </>
    )
}