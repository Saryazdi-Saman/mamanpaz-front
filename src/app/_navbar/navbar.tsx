import Link from "next/link";
import { Logo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import NavItems from "./navItems";

export default function Navbar() {
  return (
    <nav className="sticky z-50 top-0 inset-x-0 w-full h-16 py-3 px-16 flex items-center bg-background">
      
      <Link href="/" className="flex-shrink-0 h-full">
        <Logo className="h-full"/>
      </Link>

      <NavItems />

      <div className="h-full ml-auto flex items-center gap-2">
        <Button variant='outline' size='sm' className="rounded-full">
          Login
        </Button>
        <Button size='sm' className="rounded-full">
          Register
        </Button>
      </div>
    </nav>
  )
}