import { Logo } from "@/assets/svg";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky z-50 top-0 inset-x-0 w-full bg-teal-50 shadow-sm border-b border-teal-200 shadow-teal-200 py-3 px-4 flex flex-col lg:px-16 lg:flex-row lg:items-center lg:gap-4">
      <div className="flex justify-between items-center pr-4">
        <Link href="/" className="h-8 flex-shrink-0 self-start lg:h-12">
          <Logo className="h-full" />
        </Link>
      </div>
      <p>Plan</p>
      <p>Account</p>
      <p>Checkout</p>
      <p>Choose Meals</p>
    </nav>
  )
}