import { Lato, STIX_Two_Text } from 'next/font/google'

export const bodyFont = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-body',
  display: 'swap',
})

export const headingFont = STIX_Two_Text({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
})
