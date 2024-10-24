import Image from "next/image";
// import Logo from "@/app/assets/logo.svg";
// import { logInfo, logWarn, logError } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Logo } from "@/assets/svg";

export default function Home() {
  // logInfo('User logged in', { userId: '123' });
  // logWarn('Home Page called with warning', { source: 'client' });
  // logError('Home Page called with error', { source: 'client' });
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative">
      <div className="z-10">
        {/* <Image src={Logo} alt="Logo" width={800} height={800} /> */}
        <Logo width={200}/>
        <h1 className={`text-center text-3xl font-extrabold tracking-wide`}>
          Coming Soon ...
        </h1>
        <Button className="rounded-full">See Plans</Button>
      </div>
    </div>
  );
}
