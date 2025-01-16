import { GuestProvider } from "@/components/onboarding/guest-context";
import Footer from "./_footer/footer";
import Navbar from "./_navbar/navbar";
import { getGuest } from "@/lib/db/queries";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    const guestPromise = getGuest();
    
    return (
        <section className="flex flex-col min-h-screen">
            <Navbar />
            <GuestProvider guestPromise={guestPromise}>
                {children}
            </GuestProvider>
            <Footer />
        </section>
    );
}