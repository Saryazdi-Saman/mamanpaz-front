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
import { useCountdown, useMediaQuery } from "usehooks-ts"
import { Loader2 } from "lucide-react"

export function OtpDialog({
    open,
    setOpen,
    timer,
    resetTimer,
    startTimer,
}: {
    open: boolean
    setOpen: (open: boolean) => void
    timer: number
    resetTimer: () => void
    startTimer: () => void
}) {
    // const [timer, { startCountdown, resetCountdown }] = useCountdown({ countStart: 60 })
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const [loading, setLoading] = React.useState(false)

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
                    <OTPForm loading={loading} setLoading={setLoading} />
                    <DialogFooter className="mr-auto">
                        {timer === 0 ?
                            <p className="text-left">Didn't receive code?&nbsp;
                                <button
                                disabled={loading}
                                    className="text-blue-500 underline"
                                    onClick={() => {
                                        resetTimer()
                                        startTimer()
                                    }}
                                >
                                    Resend
                                </button></p>
                            :
                            <p className="text-left">{`You will receive a code in ${timer} seconds`}</p>}
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
                        Enter the 4 digit code sent to your phone number.
                    </DrawerDescription>
                </DrawerHeader>
                <OTPForm
                    loading={loading}
                    setLoading={setLoading}
                    className="px-4 items-start justify-start"
                />
                <DrawerFooter >
                    {timer === 0 ?
                        <p className="text-left">Didn't receive code?&nbsp;
                            <button
                                className="text-blue-500 underline"
                                disabled={loading}
                                onClick={() => {
                                    resetTimer()
                                    startTimer()
                                }}
                            >
                                Resend
                            </button></p>
                        :
                        <p className="text-left">{`You will receive a code in ${timer} seconds`}</p>}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function OTPForm({
    className,
    loading,
    setLoading,

}: {
    className?: string
    loading: boolean
    setLoading: (loading: boolean) => void
}) {

    const [error, setError] = React.useState<string | undefined>()
    const [otp, setOTP] = React.useState("")


    return (
        <div className={cn("flex flex-col gap-2 w-fit relative text-xl", className)}>
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
                <InputOTPGroup className="text-2xl">
                    <InputOTPSlot autoFocus className="text-lg" index={0} />
                    <InputOTPSlot className="text-lg" index={1} />
                    <InputOTPSlot className="text-lg" index={2} />
                    <InputOTPSlot className="text-lg" index={3} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    )
}
