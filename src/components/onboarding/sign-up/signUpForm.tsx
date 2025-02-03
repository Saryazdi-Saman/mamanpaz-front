'use client'

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/passwordInput";
import { submitCredentials } from "@/lib/actions/registration";
import { type CredentialsActionResponse } from "@/types/onboarding";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useEffect, useActionState, useState } from "react";
import { OtpDialog } from "./otp-dialog";
import { useCountdown } from "usehooks-ts";
import Link from "next/link";

const initalState: CredentialsActionResponse = {
    hasChanged: true,
}

export const SignUpForm = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(
        submitCredentials,
        initalState
    );

    const [timer, { startCountdown, resetCountdown }] = useCountdown({ countStart: 60 })

    useEffect(() => {
        if (state.success) {
            setDialogOpen(true);
            if (state.hasChanged) {
                resetCountdown()
                startCountdown()
            }
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
                        state.errors?.email ? "border-red-500" : "",
                        state.errors?.other && state.errors.other === "EMAIL_EXISTS" ? "border-red-500" : "",
                        state.errors?.other && state.errors.other === "EMAIL_EXISTS" ? "border-red-500" : ""
                    )} />
                {state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email[0]}</p>}
                {state.errors?.other && state.errors.other === "EMAIL_EXISTS" && <p className="text-red-500 text-sm">Email already registered. Try <Link href="/sign-in" className="text-blue-500 underline">Sign in</Link> instead.</p>}
            </div>
            <div className="w-full">
                <label htmlFor="number" className="text-muted-foreground text-sm font-semibold">PHONE NUMBER</label>
                <input
                    name="phone_number"
                    id="number"
                    type="tel"
                    title="Must be a valid phone number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onInput={(e) => {
                        const value = e.currentTarget.value.replace(/\D/g, '');
                        e.currentTarget.value = value;
                    }}
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
            {state.errors?.other && state.errors.other === "SERVER_ERROR" &&
                <div className="border-2 border-blue-500 text-base rounded-md py-4 px-4">
                    <p className="font-semibold">Uh Oh! Something went wrong.</p>
                    <p>Please try again later.</p>
                </div>
            }

            <Button
                disabled={isPending}
                className="w-full" >
                {isPending ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
            <OtpDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                timer={timer}
                resetTimer={resetCountdown}
                startTimer={startCountdown} />
        </form>
    )
}