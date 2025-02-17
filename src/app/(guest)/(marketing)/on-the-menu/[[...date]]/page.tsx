import { getMeals } from "@/data/services/menu"
import { TMenu } from "@/types/types"
import PreviewMeals from "./previewMeals"

export default async function OnTheMenu({ params }: { params: Promise<{ date: string }> }) {
    const { date }  = await params
    
    const menu: TMenu = await getMeals(date)

    return (
        <PreviewMeals menu={menu} />
    )
}