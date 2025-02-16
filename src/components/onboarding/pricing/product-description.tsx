import Price from "./price";
import { ProductWithPricing } from "@/types/types";
import { VariantSelector } from "./variant-selector";
import { AddToCart } from "./add-to-cart";
import VaraintDetails from "./variant-details";

export function ProductDescription({ product }: { product: ProductWithPricing }) {
    return (
        <div>
            <div className="mb-6 flex flex-col border-b pb-6">
                <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
                <div className="flex items-center justify-between w-full">

                    <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">

                        <Price
                            currencyCode={product.variants[0].calculated_price.currency_code?.toUpperCase() ?? "CAD"}
                            product={product}
                        />
                    </div>
                    <div className="w-auto p-2 text-base text-blue-600 text-right">
                        <VaraintDetails />
                    </div>
                </div>
            </div>
            <div>
                <VariantSelector options={product.options} variants={product.variants} />
            </div>

            <AddToCart/>
        </div>
    );
}