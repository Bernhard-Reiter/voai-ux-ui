import type { Metadata } from "next";
import { sfProDisplay, sfProText, epilogue } from './fonts'
import "./globals.css";

export const metadata: Metadata = {
  title: "voai – einfach gespart",
  description: "Angebote hochladen. Wir verhandeln. Du sparst.",
};

export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return (
    <html lang="de" className={`${sfProDisplay.variable} ${sfProText.variable} ${epilogue.variable}`}>
      <body className="bg-bg text-fg">{children}</body>
    </html>
  )
}
