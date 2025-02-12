'use client'

import { ProductWithPricing } from "@/types/types"
import { useProduct } from "./product-context"

export default function VaraintDetails({
    product
}: {
    product: ProductWithPricing
}) {
    const {state} = useProduct()
    return (
        <>

        </>
    )
}