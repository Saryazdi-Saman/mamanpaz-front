import PlanDetails from "./planDetails";
import Plans from "./plans";

export default function Pricing() {
    return (
        <section className="min-h-screen px-4 py-16 lg:py-24 lg:px-16 w-full bg-blue-50">
            <h1 className="text-4xl font-bold text-center">Personalize your meal subscription</h1>
            <p className="text-center text-lg text-blue-400">
                Chose a plan we can tailor to you each week. The more you order, the more you save!
            </p>
            <div className="py-16 px-4 flex flex-col gap-y-2 w-full max-w-7xl justify-center mx-auto md:flex-row relative">
                <Plans />
                {/* <section className="bg-background py-10 px-14">
                    <h2 className="text-2xl font-bold">1. Choose your preference</h2>
                    <ul>
                        <li>Maman's Favourites</li>
                        <li>Weight Loss</li>
                    </ul>
                </section> */}
                <div className="w-px z-50 hidden md:block bg-background py-8" aria-hidden >
                    <div className="w-full bg-blue-50 h-full"/>
                </div>
                <PlanDetails />
            </div>
        </section>
    )
}