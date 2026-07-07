import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  maximumScale: 1,
  themeColor: "#0b1740",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
