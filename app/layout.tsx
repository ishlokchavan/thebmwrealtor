import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "The BMW Realtor | Sell Your Property in Noida",
  description:
    "List your property in Noida and get connected with the top 10 brokers in the city. Sell your property in 60 days*.",
  metadataBase: new URL("https://thebmwrealtor.vercel.app"),
  openGraph: {
    title: "The BMW Realtor | Sell Your Property in Noida",
    description:
      "List your property in Noida and get connected with the top 10 brokers in the city. Sell your property in 60 days*.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1330",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
