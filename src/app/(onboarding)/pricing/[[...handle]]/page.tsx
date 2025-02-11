import { ProductProvider } from "@/components/onboarding/pricing/product-context"
import { ProductDescription } from "@/components/onboarding/pricing/product-description"
import { getAvailablePlans, getPlanVariants } from "@/lib/db/store-queries"
import { notFound, redirect, RedirectType } from "next/navigation"

export async function generateStaticParams() {
    const plans = await getAvailablePlans()

    return plans.map((plan) => ({
        handle: [plan.handle],
    }))
}

export default async function PlanPage({
    params
}: {
    params: Promise<{ handle: string }>
}) {
    const plans = await getAvailablePlans()
    const paramObj = await params
    const handle = paramObj.handle ? paramObj.handle[0] : plans[0].handle
    
    const product = await getPlanVariants(handle)

    if (!product) return redirect(`/pricing/${plans[0].handle}`, RedirectType.replace)

    return (
        <ProductProvider product={product}>
            <div className="w-full min-h-screen flex items-center justify-center">
                <ProductDescription product={product} />
            </div>
        </ProductProvider>
    )
}