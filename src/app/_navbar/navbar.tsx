import Link from "next/link";
import { Logo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import NavItems from "./navItems";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky z-50 top-0 inset-x-0 w-full bg-background py-3 px-4 flex flex-col sm:px-16 sm:flex-row ">
      <div className="flex justify-between items-center ">
        <Link href="/" className="h-8 flex-shrink-0 self-start sm:h-12">
          <Logo className="h-full" />
        </Link>

        <label htmlFor="navbar-open" className="cursor-pointer py-1 h-8 sm:h-12 sm:py-3 sm:hidden"><Menu /></label>
      </div>
      <NavItems />
    </nav>
  )
}