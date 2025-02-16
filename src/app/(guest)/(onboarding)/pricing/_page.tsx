// import { getAvailablePlans } from "@/lib/db/store-queries";
// import Plans from "./plans";
// import PlanOptions from "@/components/onboarding/pricing/planOptions";
// import { Toaster } from "@/components/ui/toaster";
// import ScrollToTop from "@/components/ui/scroll-to-top";

// export default async function Pricing() {
//     const plans = await getAvailablePlans();
//     return (
//         <section className="min-h-screen md:px-4 py-16 lg:py-24 lg:px-16 w-full bg-teal-50">
//             <ScrollToTop />
//             <Toaster />
//             <h1 className="text-3xl md:text-4xl font-bold text-center">Personalize your plan</h1>
//             <p className="text-center text-base md:text-lg text-blue-400 px-4 text-balance">
//                 Chose a plan we can tailor to you each week. The more you order, the more you save!
//             </p>
//             <div className="py-16 md:px-4 flex flex-col gap-y-2 w-full max-w-7xl justify-center mx-auto relative">
//                 <Plans plans={plans} />
//                 <div className="grid grid-cols-2 gap-y-2 gap-x-2">
//                     <PlanOptions variants={plans[0].variants} options={plans[0].options} />

//                     {/* <DeliveryScheduleOptions
//                         plans={deliveryOptions}
//                         selectedPlan={selectedPlan}
//                         selectedDelivery={selectedDelivery}
//                         multiplier={multiplier} /> */}
//                 </div>
//             </div>
//         </section>
//     )
// }