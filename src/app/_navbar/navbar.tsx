import { Logo } from "@/assets/svg";
import { Menu } from "lucide-react";
import Link from "next/link";
import NavItems from "./navItems";

export default function Navbar() {
  return (
    <nav className="sticky z-50 top-0 inset-x-0 w-full bg-teal-50 shadow-md shadow-teal-200 py-3 px-4 flex flex-col lg:px-16 lg:flex-row ">
      <div className="flex justify-between items-center ">
        <Link href="/" className="h-8 flex-shrink-0 self-start lg:h-12">
          <Logo className="h-full" />
        </Link>

        <label htmlFor="navbar-open" className="cursor-pointer py-1 h-8 lg:h-12 lg:py-3 lg:hidden"><Menu /></label>
      </div>
      <NavItems />
    </nav>
  )
}