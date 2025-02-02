import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default async function CheckoutDetailsPage() {
    return (
        <section className="w-full h-fit rounded-md border-2 border-blue-100 shadow-md bg-white py-10 px-8">
            <h2 className="text-2xl font-bold">Delivery Information</h2>
            <form className="flex flex-col items-center sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
                <div className="w-full">
                    <label htmlFor="name" className="text-muted-foreground text-sm font-semibold">FIRST NAME</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        required
                        className={clsx(
                            "w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 text-blue-500"
                        )} />
                </div>
                <div className="w-full">
                    <label htmlFor="last_name" className="text-muted-foreground text-sm font-semibold">LAST NAME</label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        required
                        className={clsx(
                            "w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                        )} />
                </div>
                <div className="w-full">
                    <label htmlFor="address_line_1" className="text-muted-foreground text-sm font-semibold">STREET ADDRESS</label>
                    <input
                        name="address_line_1"
                        id="address_line_1"
                        type="text"
                        title="Must be a valid phone number"
                        required
                        autoComplete="tel-national"
                        className={clsx(
                            "w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 [&::-webkit-inner-spin-button]:appearance-none"
                        )} />
                </div>
                <div>
                    <label htmlFor="address_line_2" className="text-muted-foreground text-sm font-semibold">APARTMENT/SUITE (optional)</label>
                    <input
                        name="address_line_2"
                        id="address_line_2"
                        type="text"
                        title="Must be a valid phone number"
                        required
                        autoComplete="address-line2"
                        className={clsx(
                            "w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 [&::-webkit-inner-spin-button]:appearance-none"
                        )} />
                </div>
                <div>
                    <label htmlFor="address_line_3" className="text-muted-foreground text-sm font-semibold">SPECIAL INSTRUCTIONS (optional)</label>
                    <input
                        name="address_line_3"
                        id="address_line_3"
                        type="text"
                        title="Must be a valid phone number"
                        required
                        autoComplete="address-line3"
                        className={clsx(
                            "w-full rounded-md border-2 border-gray-300 p-2 "
                        )} />
                </div>
                <div className="w-full flex gap-x-2">
                    <div className="w-full">
                        <label htmlFor="postal_code" className="text-muted-foreground text-sm font-semibold">POSTAL CODE</label>
                        <input
                            disabled
                            name="postal_code"
                            id="postal_code"
                            type="text"
                            title="Must be a valid phone number"
                            required
                            className={clsx(
                                "w-full rounded-md border-2 border-gray-300 p-2 "
                            )} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="city" className="text-muted-foreground text-sm font-semibold">CITY</label>
                        <input
                            disabled
                            defaultValue={"Vancouver"}
                            name="city"
                            id="city"
                            type="text"
                            title="Must be a valid phone number"
                            required
                            autoComplete="tel-national"
                            className={clsx(
                                "w-full rounded-md border-2 border-gray-300 p-2 text-muted-foreground"
                            )} />
                    </div>
                </div>
                <Button
                    type="button"
                    className=" tracking-wider sm:mt-4">
                        Continue to Payment
                </Button>
            </form>
        </section>
    )
}