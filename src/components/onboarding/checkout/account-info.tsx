import { Guest } from "@/types/onboarding"
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";

export async function AccountInfo({
    guestPromise
}:{
    guestPromise: Promise<Guest>
}) {
    const guest = await guestPromise;
    const phoneNumberUtil = PhoneNumberUtil.getInstance();
    const parsedPhoneNumber = phoneNumberUtil.parse(guest.phone_number, "CA");
    const phone_number = phoneNumberUtil.format(parsedPhoneNumber, PhoneNumberFormat.NATIONAL);
    return (
        <section className="w-full h-fit rounded-md border-2 border-blue-100 bg-white py-10 px-8">
            <h2 className="text-2xl font-bold">Account Information</h2>
            <div className="flex justify-between w-full">
                <ul>
                    <li>Email:&emsp;{guest.email}</li>
                    <li>Phone:&emsp;{phone_number}</li>
                </ul>
            </div>
        </section>
    )
}