'use client'

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import AddressAutoFill from "./adress-auto-fill";
import { submitAddressForm } from "@/lib/actions/registration";
import { useActionState } from "react";

export default function AddressForm({
    guestToken
}: {
    guestToken: string
}) {
    const [state, formAction, isPending] = useActionState(
        submitAddressForm,
        {}
    );
    return (
        <form
            action={formAction}
            className="flex flex-col items-center gap-y-2 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2 sm:items-baseline text-base py-4">
            <div className="w-full">
                <label htmlFor="name" className="text-muted-foreground text-sm font-semibold">FIRST NAME</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    defaultValue={state.inputs?.name}
                    required
                    className={clsx(
                        "w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 text-blue-500"
                    )} />

                {state.errors?.name && <p className="text-red-500 text-sm">{state.errors.name[0]}</p>}
            </div>
            <div className="w-full">
                <label htmlFor="lastname" className="text-muted-foreground text-sm font-semibold">LAST NAME</label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    autoComplete="family-name"
                    defaultValue={state.inputs?.lastname}
                    required
                    className={clsx(
                        "w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500"
                    )} />

                {state.errors?.lastname && <p className="text-red-500 text-sm">{state.errors.lastname[0]}</p>}
            </div>
            <AddressAutoFill
                addressError={state.errors?.address_line1}
                cityError={state.errors?.city}
                postCodeError={state.errors?.postal_code}
                guestToken={guestToken}
            />
            <div>
                <label htmlFor="address_line2" className="text-muted-foreground text-sm font-semibold">APARTMENT/SUITE (optional)</label>
                <input
                    name="address_line2"
                    id="address_line2"
                    type="text"
                    autoComplete="address-line2"
                    defaultValue={state.inputs?.address_line2}
                    className="w-full rounded-md border-2 border-gray-300 p-2"
                />
                {state.errors?.address_line2 && <p className="text-red-500 text-sm">{state.errors.address_line2[0]}</p>}
            </div>
            <div>
                <label htmlFor="address_line3" className="text-muted-foreground text-sm font-semibold">SPECIAL INSTRUCTIONS (optional)</label>
                <input
                    name="address_line3"
                    id="address_line3"
                    type="text"
                    autoComplete="address-line3"
                    defaultValue={state.inputs?.address_line3}
                    className="w-full rounded-md border-2 border-gray-300 p-2 "
                />

                {state.errors?.address_line3 && <p className="text-red-500 text-sm">{state.errors.address_line3[0]}</p>}
            </div>
            <Button
                className=" tracking-wider mt-2 sm:mt-4">
                Continue to Payment
            </Button>
        </form>
    )
}