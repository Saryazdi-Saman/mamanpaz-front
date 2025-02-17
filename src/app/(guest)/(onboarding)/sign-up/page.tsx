import { SignUpForm } from "@/components/onboarding/sign-up/signUpForm";
import ScrollToTop from "@/components/ui/scroll-to-top";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <section className="min-h-screen md:px-4 lg:px-16 w-full bg-teal-50">
            <ScrollToTop />
            <h1 className="py-16 text-3xl md:text-4xl font-bold text-center">Enjoy 20% off for the first month-plus, your first week ships free!</h1>
            <div className="py-8 px-4 md:px-6 flex flex-col gap-y-1 w-full max-w-lg border border-blue-50 justify-start items-start mx-auto relative bg-teal-50 rounded-md shadow-lg">
                <SignUpForm />
                <p
                    className="pt-4 text-sm text-muted-foreground"
                >By clicking continue, you agree to our <Link href="/pages/terms" className="text-blue-500 underline">Terms of Service</Link> and <Link href="/pages/privacy" className="text-blue-500 underline">Privacy Policy</Link></p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 tracking-tight">
                    <p>your phone number will be used:</p>
                    <li>For delivery purposes</li>
                    <li>Updates regarding your order</li>
                    <li>Notify you when a new menu is availble</li>
                    <li>Notify you of special offers available for you</li>
                </ul>
            </div>
        </section>
    );
}