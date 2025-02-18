import GuestInitializer from "@/components/guest/guest-initializer";
import { cookies } from "next/headers";

export default async function GuestLayout({ children }: { children: React.ReactNode }) {
    const guestId = (await cookies()).get('guest_session')?.value;

    return (
      <section className="w-full">
        <GuestInitializer guest_id={guestId} />
        {children}
      </section>
    );
  }