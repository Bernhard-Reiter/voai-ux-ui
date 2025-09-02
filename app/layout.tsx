import type { Metadata } from "next";
import "./globals.css";

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
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "voai – Angebot verhandelt und gespart",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
