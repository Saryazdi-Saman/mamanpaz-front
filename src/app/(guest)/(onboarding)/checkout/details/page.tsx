import AddressForm from "@/components/checkout/details/address-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CheckoutDetailsPage() {
    const guestId = (await cookies()).get('guest_session')?.value;
    if (!guestId) {
        redirect('/pricing')
    }
    return (
        <section className="w-full h-fit rounded-md border-2 border-blue-100 shadow-md bg-white py-10 sm:px-8 px-4">
            <h2 className="text-2xl font-bold">Delivery Information</h2>
            <AddressForm guestId={guestId} />
        </section>
    )
}