import Hero from "./hero";
import HowItWorks from "./howItWorks";
// import Logo from "@/app/assets/logo.svg";
// import { logInfo, logWarn, logError } from "@/lib/logger";


export default function Landing1() {
    // logInfo('User logged in', { userId: '123' });
    // logWarn('Home Page called with warning', { source: 'client' });
    // logError('Home Page called with error', { source: 'client' });
    return (
        <>
            <Hero />
            <HowItWorks />
        </>
    );
}
