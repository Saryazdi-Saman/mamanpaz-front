import Image from "next/image";
// import Logo from "@/app/assets/logo.svg";
// import { logInfo, logWarn, logError } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Logo } from "@/assets/svg";
import Landing1 from "./_landingpages/_1/main";

export default function Home() {
  // logInfo('User logged in', { userId: '123' });
  // logWarn('Home Page called with warning', { source: 'client' });
  // logError('Home Page called with error', { source: 'client' });
  return (
    <Landing1 />
    // <div className="w-screen h-screen flex flex-col items-center justify-center relative">
    //   <div className="z-10">
    //     <Logo width={200}/>
    //     <h1 className={`text-center text-3xl font-extrabold tracking-wide`}>
    //       Coming Soon ...
    //     </h1>
    //     <Button className="rounded-full">See Plans</Button>
    //   </div>
    // </div>
  );
}
