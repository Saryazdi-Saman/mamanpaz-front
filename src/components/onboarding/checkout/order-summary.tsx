import { HttpTypes } from "@medusajs/types"

export default async function OrderSummary({
    cartPromise
}: {
    cartPromise: Promise<HttpTypes.StoreCart>
}) {
    const formatPrice = (amount: number): string => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: cart?.currency_code,
        })
            .format(amount)
    }
    const cart = await cartPromise;
    return (
        <section className="w-full rounded-md border-2 border-teal-500 shadow-inner text-blue-500 bg-white py-10 px-8
                            sm:max-w-md">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <p>FIRST DELIVERY DATE</p>
            <div className="flex justify-between w-full">
                <ul>
                    {cart.items?.map((item) => (
                        <li key={item.id}>
                            {item.title} plan -
                            Price: {formatPrice(item.unit_price)}
                        </li>
                    ))}
                    <li>Weekly Total: {formatPrice(cart.total)}</li>
                </ul>
            </div>
        </section>
    )
}