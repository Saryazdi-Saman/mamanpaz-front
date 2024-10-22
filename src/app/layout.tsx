import type { Metadata } from "next";
import "./globals.css";
import { bodyFont, headingFont } from "./fonts";

export const metadata: Metadata = {
  title: "Mamanpaz Meals",
  description: "Maman's love in every bite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
