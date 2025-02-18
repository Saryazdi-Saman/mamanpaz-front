'use client'

import { setGuest } from "@/lib/actions/guest";
import { useEffect } from "react"

export default function GuestInitializer({ guest_id }: { guest_id?: string }) {
    useEffect(() => {
        if (!guest_id) {
            setGuest()
                .catch(error => {
                    console.error('GusetInitializer -> Failed to initialize guest:', error)
                })
        }
    }, [guest_id])

    return null
}