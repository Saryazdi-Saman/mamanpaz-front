import {STIX_Two_Text, Lato} from 'next/font/google'

export const bodyFont = Lato({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
    style: ['normal', 'italic'],
    display: 'swap',
});
export const headingFont = STIX_Two_Text({
    subsets: ['latin'],
    display: 'swap',
})