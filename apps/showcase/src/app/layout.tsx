import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/components/UIProvider";

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
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[var(--c-bg)] text-[var(--c-foreground)] font-sans antialiased">
        <UIProvider>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}