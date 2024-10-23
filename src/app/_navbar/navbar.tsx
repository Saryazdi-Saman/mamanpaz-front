import Link from "next/link";
import { Logo } from "@/assets/svg";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky z-50 top-0 inset-x-0 w-full h-[74px] py-6 px-32 flex items-center bg-brown-500">
      <Link href="/" className="flex-shrink-0 h-full">
        <Logo className="h-full" />
      </Link>

      <div className="ml-28 flex items-center">
        <ul className="flex items-center gap-8">
          <li><a href="/menu" className="hover:text-primary transition-colors">Menu</a></li>
          <li><a href="/plans" className="hover:text-primary transition-colors">Plans</a></li>
          <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
          <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
          <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
        </ul>
      </div>

      <div className="h-full ml-auto flex items-center">
        <Button variant='link' size='sm' className="rounded-full">
          Register
        </Button>
        <Button variant='outline' size='sm' className="rounded-full">
          Login
        </Button>
        {/* <Button className="rounded-full">
          Login
        </Button> */}
      </div>
    </nav>
  )
}