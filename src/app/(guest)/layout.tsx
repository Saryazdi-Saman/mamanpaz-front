import GuestInitializer from "@/components/guest/guest-initializer";
import { cookies } from "next/headers";

export default async function GuestLayout({ children }: { children: React.ReactNode }) {
    const guestToken = (await cookies()).get('guest_session')?.value;

    return (
      <section className="w-full">
        <GuestInitializer guest_token={guestToken} />
        {children}
      </section>
    );
  }