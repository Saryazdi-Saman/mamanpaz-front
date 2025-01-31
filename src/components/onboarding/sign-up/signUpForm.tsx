'use client'

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/passwordInput";
import { submitCredentials } from "@/lib/actions/credentials";
import type { CredentialsActionResponse } from "@/types/onboarding";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useEffect, useActionState, useState } from "react";
import { OtpDialog } from "./otp-dialog";

const initalState: CredentialsActionResponse = {
    success: false,
    message: "",
}

export const SignUpForm = () => {
    const [ dialogOpen, setDialogOpen ] = useState(false);

    const [state, formAction, isPending] = useActionState(
        submitCredentials,
        initalState
    );

    useEffect(() => {
        if (state.errors?.phoneNumber) {
            setDialogOpen(true);
        }
    }, [state]);


    return (
        <form action={formAction} className="flex flex-col gap-y-1 w-full">
            <legend className="text-xl text-muted-foreground font-bold pb-4 leading-none tracking-tight">Create your account</legend>
            <div className="w-full">
                <label htmlFor="email" className="text-muted-foreground text-sm font-semibold">EMAIL</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    defaultValue={state.inputs?.email}
                    required
                    className={clsx(
                        "w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500",
                        state.errors?.email ? "border-red-500" : ""
                    )} />
                {state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email[0]}</p>}
            </div>
            <div className="w-full">
                <label htmlFor="number" className="text-muted-foreground text-sm font-semibold">PHONE NUMBER</label>
                <input
                    title="Must be a valid phone number"
                    type="number"
                    name="phone_number"
                    id="number"
                    min={2000000000}
                    max={9999999999}
                    required
                    autoComplete="tel-national"
                    defaultValue={state.inputs?.phoneNumber}
                    className={clsx(
                        "w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 [&::-webkit-inner-spin-button]:appearance-none",
                        state.errors?.phoneNumber ? "border-red-500" : ""
                    )} />
                {state.errors?.phoneNumber && <p className="text-red-500 text-sm">{state.errors.phoneNumber[0]}</p>}
            </div>
            <div className="w-full pb-1">
                <label htmlFor="password" className="text-muted-foreground text-sm font-semibold">PASSWORD</label>
                <PasswordInput
                    name="password"
                    id="password"
                    required
                    defaultValue={state.inputs?.password}
                    className={state.errors?.password ? "border-red-500" : ""}
                />
                {state.errors?.password && <p className="text-red-500 text-sm">{state.errors.password[0]}</p>}
            </div>
            <Button
                disabled={isPending}
                className="w-full"
                >
                {isPending ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
            <OtpDialog open={dialogOpen} setOpen={setDialogOpen} />
        </form>
    )
}