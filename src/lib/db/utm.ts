import { UTM } from "@/types/types";

type TrackingHeader = {
    user_agent: string,
    referer: string,
    origin: string,
    ip_address: string
};
export async function submitGuestVisit({utm, headerObject, guestToken}:{
    utm: UTM,
    headerObject: TrackingHeader,
    guestToken: string
}) {
    const test = {...utm, ...headerObject}
    try {
        const result = await fetch(`${process.env.MEDUSA_BACKEND_URI}/store/guest/${guestToken}/visit`, {
            method: "POST",
            credentials: "include",
            headers: {
                "x-publishable-api-key": `${process.env.MEDUSA_PUBLIC_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...utm, ...headerObject})
        })
    } catch (error) {
        console.error("Could not register UTM data", error)
    }
}