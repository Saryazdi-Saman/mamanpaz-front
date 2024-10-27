import { Separator } from "@/components/ui/separator";
import Hero from "./hero";
import HowItWorks from "./howItWorks";
import PromoBanner from "./promoBanner";
import Meals from "./meals";
import Plans from "./plans";
import Reviews from "./reviews";
// import Logo from "@/app/assets/logo.svg";
// import { logInfo, logWarn, logError } from "@/lib/logger";


export default function Landing1() {
    // logInfo('User logged in', { userId: '123' });
    // logWarn('Home Page called with warning', { source: 'client' });
    // logError('Home Page called with error', { source: 'client' });
    return (
        <>
            <Hero />
            <Separator className="w-[calc(100%-4rem)] mx-auto bg-blue-50 h-px"/>
            <HowItWorks />
            <PromoBanner />
            <Meals />
            <Separator className="w-[calc(100%-4rem)] mx-auto bg-blue-50 h-px"/>
            <Plans />
            <Reviews />
        </>
    );
}
