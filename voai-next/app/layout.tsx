import type { Metadata } from "next";
import { sharpBook20, sharpMedium20, epilogue } from './fonts'
import "./globals.css";

export const metadata: Metadata = {
  title: "voai – einfach gespart",
  description: "Angebote hochladen. Wir verhandeln. Du sparst.",
};

export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return (
    <html lang="de" className={`${sharpBook20.variable} ${sharpMedium20.variable} ${epilogue.variable}`}>
      <body className="bg-bg text-fg">{children}</body>
    </html>
  )
}
