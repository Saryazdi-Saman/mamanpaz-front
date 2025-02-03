import { Guest } from "@/types/onboarding"
import { redirect } from "next/navigation";

export async function DeliveryInfo({
    guestPromise
}:{
    guestPromise: Promise<Guest>
}) {
    const guest = await guestPromise;
    if (!guest.address_line1 || !guest.city || !guest.postal_code || !guest.name || !guest.last_name) {
        redirect('/address')
    }
    return (
        <section className="w-full px-4 py-10 h-fit rounded-md border-2 border-blue-100 bg-white space-y-2
        sm:px-8">
            <h2 className="text-2xl font-bold">Delivery Information</h2>
            <div className="flex justify-between w-full">
                <ul>
                    <li>{guest.name[0].toUpperCase()+guest.name.slice(1)}&nbsp;{guest.last_name[0].toUpperCase() + guest.last_name.slice(1)}</li>
                    <li>{guest.address_line1}, {guest.city}, {guest.postal_code}</li>
                </ul>
            </div>
        </section>
    )
}