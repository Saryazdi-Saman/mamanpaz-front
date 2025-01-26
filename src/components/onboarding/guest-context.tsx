'use client';

import { Guest } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, use, useContext, useOptimistic } from "react";

type GuestContextType = {
    session: Guest;
    updateSession: (action: Partial<Guest>) => void;
};

const GuestContext = createContext<GuestContextType | undefined>(undefined);

function updateGuest(state: Guest, update: Partial<Guest>): Guest {
    const newState = { ...state, ...update };
    console.log("updating guest session:")
    console.log(newState)
    return newState;
}

export function GuestProvider({
    children,
    guestPromise
}: {
    children: React.ReactNode;
    guestPromise: Promise<Guest>;
}) {
    console.log("GuestProvider")
    const initialGuest = use(guestPromise);
    console.log("initialGuest")
    console.log(initialGuest)
    const [optimisticGuest, updateOptimisticGuest] = useOptimistic(initialGuest, updateGuest);
    // console.log(optimisticGuest)

    // const value = useMemo(
    //     () => ({
    //         session: optimisticGuest,
    //         updateSession: updateOptimisticGuest
    //     }),
    //     [optimisticGuest]
    // )

    return (
        <GuestContext.Provider value={{session: optimisticGuest, updateSession: updateOptimisticGuest}}>
            { children }
        </GuestContext.Provider >
        )
}

export function useGuest() {
    const context = useContext(GuestContext);
    if (context === undefined) {
        throw new Error('useGuest must be used within a GuestProvider');
    }
    return context;
}