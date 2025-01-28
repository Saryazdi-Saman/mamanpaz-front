'use client'
import * as React from "react"

import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import clsx from "clsx"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)

        return (
            <div className="relative h-fit w-full">
                <input
                    type={showPassword ? "text" : "password"}
                    className={cn(
                        "w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <button
                    type="button"
                    className="absolute right-1 top-1/2 px-1 h-full w-fit -translate-y-1/2 text-muted-foreground"
                    aria-label="Toggle show password"
                    onClick={() => setShowPassword(!showPassword)}
                >{
                    showPassword
                        ? <EyeIcon className="h-4 w-4" />
                        : <EyeOffIcon className="h-4 w-4" />
                }
                    
                </button>
            </div>
        )
    }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
