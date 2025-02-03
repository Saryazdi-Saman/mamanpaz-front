import AddressForm from "@/components/checkout/details/address-form";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default async function CheckoutDetailsPage() {
    return (
        <section className="w-full h-fit rounded-md border-2 border-blue-100 shadow-md bg-white py-10 sm:px-8 px-4">
            <h2 className="text-2xl font-bold">Delivery Information</h2>
            <AddressForm />
        </section>
    )
}