export default function Plans() {
    return (
        <section className="bg-background py-10 px-14 grow">
            <h2 className="text-2xl font-bold text-center">1. Choose your preference</h2>
            <ul className="py-4 mx-auto w-fit flex flex-wrap gap-4 items-stretch justify-center">
                <li className="relative">
                    {/* <FaCheckCircle className="absolute top-0 bg-background rounded-full right-0 text-xl text-teal-700 select-none z-10 -translate-x-1/2 translate-y-1/2" /> */}
                    <div className="select-none relative w-96 overflow-hidden border-2 bg-background border-teal-700 px-10 py-6 cursor-pointer">
                        <h3 className="text-xl font-semibold leading-tight text-teal-700">
                            Maman&apos;s Favorites
                        </h3>
                        <p className="text-muted-foreground">Maman&apos;s special meals</p>
                    </div>
                </li>
                <li className="relative">
                    <div className="select-none relative w-96 overflow-hidden border-2 border-muted bg-background  hover:border-teal-700 px-10 py-6 cursor-pointer">
                        <h3 className="text-xl font-semibold leading-tight">
                            Wight Loss
                        </h3>
                        <p className="text-muted-foreground">A dedicated dietition will create recepies tailored to your needs</p>
                    </div>
                </li>
            </ul>
        </section>
    )
}