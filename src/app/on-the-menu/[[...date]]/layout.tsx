import { getMenuDates } from "@/data/services/menu";
import { MenuPicker } from "./menuPicker";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

type LayoutProps = {
    children: React.ReactNode,
    params: Promise<{ date: Array<string> | undefined }>,
}

export default async function MenuLayout({ children, params }: LayoutProps) {
    const availableMenus = await getMenuDates()
    const { date } = await params
    let requestedDate: string
    if (!date) {
        requestedDate = availableMenus.current[0]
    } else if (!availableMenus.upcomming.includes(date[0]) && !availableMenus.past.includes(date[0])) {
        redirect(`/on-the-menu`)
    } else {
        requestedDate = date[0]
    }

    return (
        <section className="flex flex-col min-h-screen bg-teal-50 items-center pt-16 gap-6">
            <header>
                <h1 className="text-4xl lg:text-5xl font-medium">Personalize your meal subscription</h1>
                <p className="text-center text-lg text-blue-400">
                    Chose a plan we can tailor to you each week. The more you order, the more you save!
                </p>
            </header>
            <div className="w-full bg-brown-50 py-12 grow">
                <div className="flex flex-col gap-6 w-full bg-brown-50 relative px-16 max-w-7xl mx-auto">

                    <div className='flex flex-col w-full sm:flex-row sm:justify-between sm:items-center'>
                        <MenuPicker dates={availableMenus} selectedDate={requestedDate} />
                        <Button className="hidden sm:block">Get Started</Button>
                    </div>
                    {children}
                </div>
            </div>
        </section>
    )
}