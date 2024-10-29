import IKImage from "@/lib/IKImage";
import { Star } from "lucide-react";

const socials = [
    'socialmedia/social-1.png',
    'socialmedia/social-2.png',
    'socialmedia/social-3.png',
    'socialmedia/social-4.png',
    'socialmedia/social-5.png'
];

export default function Reviews() {
    return (
        <section className="px-4 pb-16 space-y-6 lg:pb-24 lg:px-16 lg:space-y-10 w-svw">
            <ul className="ratings text-review w-full h-60 flex gap-2 lg:gap-6 max-w-7xl mx-auto items-center justify-start overflow-x-auto lg:justify-center ">
                <li className="h-full min-w-80 max-w-md lg:min-w-96 rounded-2xl bg-blue-500 p-6 space-y-3">
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
                    <p className="font-bold text-base text-background line-clamp-4">The meals remind me of my mom&apos;s cooking back in Iran. It&apos;s like a taste of home delivered to my door every week. No prep, no mess, just delicious food ready in minutes!</p>
                </li>


                <li className="h-full min-w-80 max-w-md lg:min-w-96 rounded-2xl bg-blue-500 p-6 space-y-3">
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


                <li className="h-full min-w-80 max-w-md lg:min-w-96 rounded-2xl bg-blue-500 p-6 space-y-3">
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
            <h1 className="mx-auto text-center font-medium text-4xl lg:text-5xl">People are <span className="font-bold italic">happy to share us</span> on socials</h1>
            <ul className="flex gap-3 mx-auto w-full max-w-7xl overflow-x-auto h-fit">
                {socials.map((social, index) => (
                    <li key={index} className="relative w-64 h-suto shrink-0">
                        <IKImage src={social} alt='social media sharing' height={251} width={414} />
                    </li>
                ))}
            </ul>
        </section>
    )
}