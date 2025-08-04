import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/components/UIProvider";
import { getVariantServer } from "@/lib/flags";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "voai - AI-Powered Negotiation Platform",
  description: "Transform your negotiations with AI-driven insights and automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get variant from server-side headers
  const variant = getVariantServer();
  
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <UIProvider variant={variant}>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}