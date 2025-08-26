import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "voai - Automatisierte Spesenabrechnungen für Unternehmen",
  description: "Reduzieren Sie Ihren Verwaltungsaufwand um 80% mit voai. Automatisierte Spesenabrechnung, die Zeit und Geld spart.",
  keywords: "Spesenabrechnung, Automatisierung, Unternehmenssoftware, Buchhaltung, Digitalisierung",
  openGraph: {
    title: "voai - Automatisierte Spesenabrechnungen",
    description: "Reduzieren Sie Ihren Verwaltungsaufwand um 80% mit voai",
    type: "website",
    locale: "de_DE",
    siteName: "voai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
