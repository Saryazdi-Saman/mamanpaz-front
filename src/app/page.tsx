import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
// import { logInfo, logWarn, logError } from "@/lib/logger";
import { Button } from "@/components/ui/button";

export default function Home() {
  // logInfo('User logged in', { userId: '123' });
  // logWarn('Home Page called with warning', { source: 'client' });
  // logError('Home Page called with error', { source: 'client' });
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative">
      <div className="z-10 -mt-40">
        <Image src={Logo} alt="Logo" width={800} height={800} />
        <h1 className={`text-center text-5xl font-extrabold tracking-wide -mt-24`}>
          Coming Soon ...
        </h1>
        <Button className="py-10 px-14 rounded-full ">See Plans</Button>
      </div>
    </div>
  );
}
