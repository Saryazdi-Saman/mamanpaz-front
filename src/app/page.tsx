import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import { headingFont } from "./fonts";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative">
      <div className="z-10 -mt-40">
        <Image src={Logo} alt="Logo" width={800} height={800} />
        <h1 className={`text-center text-foreground text-5xl font-extrabold tracking-wide ${headingFont.className} -mt-24`}>
          Coming Soon ...
        </h1>
      </div>
    </div>
  );
}
