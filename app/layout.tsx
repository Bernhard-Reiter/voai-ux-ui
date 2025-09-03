import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "voai – Lass für dich verhandeln und spare ohne Risiko",
  description: "Du lädst dein Angebot hoch. Wir verhandeln. Du zahlst nur, wenn du wirklich sparst. 100% erfolgsbasiert, transparent & fair.",
  keywords: "Angebot verhandeln, Preisverhandlung, sparen, Rabatt, voai, erfolgsbasiert, fair, transparent",
  openGraph: {
    title: "voai – einfach sparen!",
    description: "Wir verhandeln fair, professionell und ohne Risiko. Keine Ersparnis = keine Kosten. Garantiert.",
    type: "website",
    locale: "de_DE",
    siteName: "voai",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "voai – Dein Angebot ist zu teuer? Wir verhandeln für dich!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "voai – einfach sparen!",
    description: "Wir verhandeln fair, professionell und ohne Risiko. Keine Ersparnis = keine Kosten.",
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
