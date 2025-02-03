import { Button } from "@/components/ui/button";
import clsx from "clsx";
import AddressAutoFill from "./adress-auto-fill";

export default function AddressForm() {
    return (
        <form className="flex flex-col items-center gap-y-2 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2 text-base py-4">
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
            <AddressAutoFill />
            <div>
                <label htmlFor="address_line_2" className="text-muted-foreground text-sm font-semibold">APARTMENT/SUITE (optional)</label>
                <input
                    name="address_line_2"
                    id="address_line_2"
                    type="text"
                    title="Must be a valid phone number"
                    required
                    autoComplete="address-line2"
                    className="w-full rounded-md border-2 border-gray-300 p-2"
                />
            </div>
            <div>
                <label htmlFor="address_line_3" className="text-muted-foreground text-sm font-semibold">SPECIAL INSTRUCTIONS (optional)</label>
                <input
                    name="address_line_3"
                    id="address_line_3"
                    type="text"
                    autoComplete="address-line3"
                    className="w-full rounded-md border-2 border-gray-300 p-2 "
                />
            </div>
            <Button
                type="button"
                className=" tracking-wider mt-2 sm:mt-4">
                Continue to Payment
            </Button>
        </form>
    )
}