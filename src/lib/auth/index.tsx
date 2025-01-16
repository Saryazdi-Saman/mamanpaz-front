'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { use } from 'react';
import { createGuestSession } from './actions';
import { Guest } from '@/types/types';

type GuestContextType = {
  guest: Guest | null;
  setGuest: (guest: Guest | null) => void;
};

const GuestContext = createContext<GuestContextType | null>(null);

export function useGuest(): GuestContextType {
  const context = useContext(GuestContext);
  if (context === null) {
    throw new Error('useGuest must be used within a GuestProvider');
  }
  return context;
}

export function GuestProvider({
  children,
  guestPromise,
}: {
  children: ReactNode;
  guestPromise: Promise<Guest | null>;
}) {
  const initialGuest = use(guestPromise);
  const [guest, setGuest] = useState<Guest | null>(initialGuest);

  useEffect(() => {
    if (initialGuest && initialGuest.token) {
      async function newSession(token: string) {
        console.log("newSession");
        console.log(token);
        await createGuestSession('guest', token);
        return
      }
      newSession(initialGuest.token);
    }
    setGuest(initialGuest);
  }, []);

  return (
    <GuestContext.Provider value={{ guest, setGuest }}>
      {children}
    </GuestContext.Provider>
  );
}