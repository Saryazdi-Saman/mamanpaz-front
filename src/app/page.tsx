import Image from "next/image";
import Logo from "@/app/assets/logo.svg";
import { headingFont } from "./fonts";
import { logInfo } from "@/lib/logger";

export default function Home() {
  logInfo('User logged in', { userId: '123' });
  // log.info('Home Page called');
  // log.debug('Home Page called', { source: 'client' });
  // log.error('Home Page called with error', { source: 'client' });
  // log.warn('Home Page called with warning', { source: 'client' });
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
