import type { Metadata } from "next";
import { Dancing_Script, Cormorant_SC, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const cormorantSC = Cormorant_SC({
  variable: "--font-cormorant-sc",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corey & Tina",
  description: "We're getting married!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} ${cormorantSC.variable} ${cormorantGaramond.variable} antialiased bg-ivory text-charcoal`}
      >
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
