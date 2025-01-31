import * as React from "react"

import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { submitOtp } from "@/lib/actions/credentials"
import { useMediaQuery } from "usehooks-ts"
import { Loader2 } from "lucide-react"

export function OtpDialog({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: (open: boolean) => void
}) {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-lg py-10 px-12 ">
                    <DialogHeader>
                        <DialogTitle>Verify phone number</DialogTitle>
                        <DialogDescription>
                            Please enter the 4 digit code we sent to your phone number.
                        </DialogDescription>
                    </DialogHeader>
                    <OTPForm />
                    <DialogFooter>
                        <p className="text-left">Didn't receive the code? <a href="#" className="text-blue-500 underline">Resend</a></p>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="px-4 py-3">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Verify phone number</DrawerTitle>
                    <DrawerDescription>
                        Please enter the 4 digit code we sent to your phone number.
                    </DrawerDescription>
                </DrawerHeader>
                <OTPForm className="px-4 items-start justify-start" />
                <DrawerFooter >
                    <p>Didn't receive the code? <a href="#" className="text-blue-500 underline">Resend</a></p>
                    {/* <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose> */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function OTPForm({ className }: React.ComponentProps<"form">) {

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | undefined>()
    const [otp, setOTP] = React.useState("")


    return (
        <div className={cn("flex flex-col gap-2 w-fit relative pb-6", className)}>
            <div className="h-6 flex">
                {loading && <div className="w-full justify-center"><Loader2 className="animate-spin" /> </div>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <InputOTP
                disabled={loading}
                autoFocus
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                autoComplete="one-time-code"
                value={otp}
                onChange={async (value) => {
                    setOTP(value)
                    if (value.length === 4) {
                        setError(undefined)
                        setLoading(true)
                        const result = await submitOtp(value)
                        if (result.error) {
                            setOTP("")
                            setError(result.error)
                        }
                        setLoading(false)
                    }
                }}
            >
                <InputOTPGroup>
                    <InputOTPSlot autoFocus index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    )
}
