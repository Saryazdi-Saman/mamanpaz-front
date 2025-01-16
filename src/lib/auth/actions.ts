'use server'
import { cookies } from "next/headers";
import { updateGuestSession } from "../db/queries";
import { revalidateTag } from "next/cache";
import { Guest } from "@/types/types";

export async function updatePlanMealCount(
    prevState: any,
    selectedAmount: number
) {
    const cookieHeader = (await cookies()).get('guest_session')?.value;
    if (!cookieHeader) {
        return "Error updating plan's meal count";
    } 

    try {
        await updateGuestSession({
            token: cookieHeader,
            updates: {
                daily_meals: selectedAmount,
                weekly_meals: selectedAmount * 7
            }
        });
        revalidateTag('guest_session');
    } catch (error) {
        return "Error updating plan's meal count";
    }
}

export async function updatePlanSchedule(
    prevState: any,
    selectedSchedule: Guest['delivery']
) {
    const cookieHeader = (await cookies()).get('guest_session')?.value;
    if (!cookieHeader) {
        return 'Error updating plan schedule';
    } 

    try {
        await updateGuestSession({
            token: cookieHeader,
            updates: {
                delivery: selectedSchedule
            }
        });
        revalidateTag('guest_session');
    } catch (error) {
        return 'Error updating plan schedule';
    }
}