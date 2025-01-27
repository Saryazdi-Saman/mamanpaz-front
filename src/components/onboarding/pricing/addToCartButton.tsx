'use client'
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "@/lib/actions/guest";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";

export function AddToCartButton() {
    const [state, action, isPending] = useActionState(
        addToCart,
        undefined,
    )

    const { toast } = useToast()

    useEffect(() => {
        if (state?.error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem reaching our servers. Please try again later.",
                // duration: 5000,
            })
        }
    }, [state])
    return (
        <div className="w-full flex justify-center pt-5">
            <div className="flex flex-col items-center gap-2 w-full">
                {state?.error && <div
                    className="self-stretch h-fit rounded-lg border border-red-600 flex justify-center items-center gap-4 py-2">
                    <FaExclamationCircle className="text-red-700 text-xl" />
                    <div className="flex flex-col items-start">
                        <p className="text-center text-base md:text-lg text-red-700 px-4 text-balance">
                            Opps! Something went wrong
                        </p>
                        <p className="text-center text-base md:text-lg  px-4 text-balance text-red-700">
                            Please try again later
                        </p>
                    </div>
                </div>}
                <Button
                    formAction={action}
                    disabled={isPending}
                    className="w-fit justify-self-end"
                >{isPending ? <>
                    <Loader2 className="animate-spin" />
                    Please wait...
                </> : "Continue"}</Button>
            </div>
        </div>
    )
}