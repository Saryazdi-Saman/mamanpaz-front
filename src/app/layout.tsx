import type { Metadata } from "next";
import "./globals.css";
import { bodyFont } from "./fonts";

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
    <html lang="en">
      <body
        className={`${bodyFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
