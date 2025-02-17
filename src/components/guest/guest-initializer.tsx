'use client'

import { setGuest } from "@/lib/actions/guest";
import { useEffect } from "react"

export default function GuestInitializer({ guest_token }: { guest_token?: string }) {
    useEffect(() => {
        if (!guest_token) {
            setGuest()
                .catch(error => {
                    console.error('GusetInitializer -> Failed to initialize guest:', error)
                })
        }
    }, [guest_token])

    return null
}