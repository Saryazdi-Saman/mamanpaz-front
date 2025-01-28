import { getAvailableDeliveryOptions, getAvailablePlans } from "@/lib/db/store-queries";
import Plans from "./plans";
import PlanOptions from "@/components/onboarding/pricing/planOptions";
import DeliveryScheduleOptions from "@/components/onboarding/pricing/deliveryScheduleOptions";
import { addToCart } from "@/lib/actions/guest";
import { Toaster } from "@/components/ui/toaster";

export default async function Pricing({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const plans = await getAvailablePlans();
    const deliveryOptions = await getAvailableDeliveryOptions();
    const params = await searchParams;

    const searchedPlan = params.plan;
    const searchedDelivery = params.delivery;
    const selectedPlan = {
        slug: searchedPlan ?? plans[0].slug,
        id: plans.find((plan) => plan.slug === searchedPlan)?.product_variant.id ?? plans[0].product_variant.id
    }
    const selectedDelivery = {
        slug: searchedDelivery ?? deliveryOptions[0].slug,
        id: deliveryOptions.find((delivery) => delivery.slug === searchedDelivery)?.product_variant.id ?? deliveryOptions[0].product_variant.id
    }
    // const selectedPlan = searchedPlan ?? plans[0].slug;

    const multiplier = plans.find((plan) => plan.slug === selectedPlan.slug)?.meals_per_day ?? 1;

    return (
        <section className="min-h-screen md:px-4 py-16 lg:py-24 lg:px-16 w-full bg-teal-50">
            <Toaster />
            <h1 className="text-3xl md:text-4xl font-bold text-center">Personalize your plan</h1>
            <p className="text-center text-base md:text-lg text-blue-400 px-4 text-balance">
                Chose a plan we can tailor to you each week. The more you order, the more you save!
            </p>
            <div className="py-16 md:px-4 flex flex-col gap-y-2 w-full max-w-7xl justify-center mx-auto relative">
                <Plans />
                <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                    <PlanOptions
                        plans={plans}
                        selectedPlan={selectedPlan}
                        selectesDelivery={selectedDelivery} />

                    <DeliveryScheduleOptions
                        plans={deliveryOptions}
                        selectedPlan={selectedPlan}
                        selectedDelivery={selectedDelivery}
                        multiplier={multiplier} />
                </div>
            </div>
        </section>
    )
}