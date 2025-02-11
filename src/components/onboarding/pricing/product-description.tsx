import Price from "./price";
import { ProductWithPricing } from "@/types/types";
import { VariantSelector } from "./variant-selector";
import { AddToCart } from "@/components/cart/add-to-cart";

export function ProductDescription({ product }: { product: ProductWithPricing }) {
    return (
        <div>
            <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
                <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">

                    <Price
                        // amount={product.variants[0].calculated_price.original_amount?.toString() ?? "0"}
                        currencyCode={product.variants[0].calculated_price.currency_code?.toUpperCase() ?? "CAD"}
                        product={product}
                    />
                </div>
            </div>
            <div>
                <VariantSelector options={product.options} variants={product.variants} />
            </div>
            {/* <VariantSelector options={product.options} variants={product.variants} /> */}

            <AddToCart product={product} />
        </div>
    );
}