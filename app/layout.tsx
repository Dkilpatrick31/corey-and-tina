import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const greatVibes = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Christina & Corey | April 3, 2027",
  description: "Join us as we celebrate our wedding in New Orleans, Louisiana at Hotel Peter and Paul.",
  openGraph: {
    title: "Christina & Corey | April 3, 2027",
    description: "Join us as we celebrate our wedding in New Orleans, Louisiana at Hotel Peter and Paul.",
    url: "https://coreyandtina.com",
    siteName: "Christina & Corey Wedding",
    images: [
      {
        url: "https://coreyandtina.com/images/Christana-and-Corey-Thumbnail.jpeg",
        width: 1200,
        height: 1200,
        alt: "Christina and Corey",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christina & Corey | April 3, 2027",
    description: "Join us as we celebrate our wedding in New Orleans, Louisiana at Hotel Peter and Paul.",
    images: ["https://coreyandtina.com/images/Christana-and-Corey-Thumbnail.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${cormorantGaramond.variable} antialiased bg-ivory text-charcoal`}
      >
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
