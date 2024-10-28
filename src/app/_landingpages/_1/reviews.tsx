import { Star } from "lucide-react";
import social1 from "@/assets/placeholders/social-1.png"
import social2 from "@/assets/placeholders/social-2.png"
import social3 from "@/assets/placeholders/social-3.png"
import social4 from "@/assets/placeholders/social-4.png"
import social5 from "@/assets/placeholders/social-5.png"
import Image from "next/image";
import IKImage from "@/lib/IKImage";

const socials = [
    'socialmedia/social-1.png',
    'socialmedia/social-2.png',
    'socialmedia/social-3.png',
    'socialmedia/social-4.png',
    'socialmedia/social-5.png'
];

export default function Reviews() {
    return (
        <section className="pb-24 px-16 space-y-10">
            <ul className="ratings text-review w-full h-60 flex gap-6 max-w-7xl mx-auto">
                <li className="h-full w-full max-w-md rounded-2xl bg-blue-500 p-6 space-y-3">
                    <header className="space-y-2">
                        <h3 className="font-body font-bold text-base text-background leading-6">Sara N.</h3>
                        <p className="text-xs text-blue-100 leading-5">24 May, 2024</p>
                        <div className="flex">
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                        </div>
                    </header>
                    <p className="font-bold text-base text-background">The meals remind me of my mom&apos;s cooking back in Iran. It's like a taste of home delivered to my door every week. No prep, no mess, just delicious food ready in minutes!</p>
                </li>


                <li className="h-full w-full max-w-md rounded-2xl bg-blue-500 p-6 space-y-3">
                    <header className="space-y-2">
                        <h3 className="font-body font-bold text-base text-background leading-6">Ali R.</h3>
                        <p className="text-xs text-blue-100 leading-5">24 May, 2024</p>
                        <div className="flex">
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                        </div>
                    </header>
                    <p className="font-bold text-base text-background">As a busy professional, I love the convenience of Mamanpaz. The meals are healthy, flavorful, and take me right back to the flavors I grew up with.</p>
                </li>


                <li className="h-full w-full max-w-md rounded-2xl bg-blue-500 p-6 space-y-3">
                    <header className="space-y-2">
                        <h3 className="font-body font-bold text-base text-background leading-6">Negin H.</h3>
                        <p className="text-xs text-blue-100 leading-5">24 May, 2024</p>
                        <div className="flex">
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                            <Star width={18} className="text-teal-400 fill-current" />
                        </div>
                    </header>
                    <p className="font-bold text-base text-background">The weight loss plan is fantastic! Not only are the meals fresh and healthy, but they also helped me stay on track with my goals without sacrificing taste.</p>
                </li>
            </ul>
            <h1 className="mx-auto text-center font-medium text-5xl">People are <span className="font-bold italic">happy to share us</span> on socials</h1>
            <ul className="flex gap-3 mx-auto w-fit max-w-7xl">
                {socials.map((social, index) => (
                    <li key={index}>
                        <IKImage src={social} alt='social media sharing' height={251} width={414} />
                    </li>
                ))}
            </ul>
        </section>
    )
}