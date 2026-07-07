import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "The BMW Realtor | Building Massive Wealth in Noida Real Estate",
  description:
    "Sell your property in 60 days*. List once and get connected with the top 10 brokers of Noida — verified buyers, a faster close, and the best value for your property.",
  metadataBase: new URL("https://buildingmassivewealth.com"),
  openGraph: {
    title: "The BMW Realtor | Building Massive Wealth in Noida",
    description:
      "Sell your property in 60 days*. Get connected with the top 10 brokers of Noida.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0c10",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
