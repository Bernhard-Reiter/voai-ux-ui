import localFont from 'next/font/local'
import { Epilogue } from 'next/font/google'

// Sharp Grotesk fonts werden auskommentiert, bis die Font-Dateien verfügbar sind
// Siehe FONT-NOTE.md für Instruktionen zum Font-Export aus Brandox
/*
export const sharpBook20 = localFont({
  src: [
    { path: '/fonts/sharp-grotesk/Sharpgroteskbook20.woff2', weight: '400', style: 'normal' },
    { path: '/fonts/sharp-grotesk/Sharpgroteskbook20.woff',  weight: '400', style: 'normal' },
  ],
  variable: '--font-sharp-book20',
  display: 'swap',
})

export const sharpMedium20 = localFont({
  src: [
    { path: '/fonts/sharp-grotesk/Sharpgroteskmedium20.woff2', weight: '500', style: 'normal' },
    { path: '/fonts/sharp-grotesk/Sharpgroteskmedium20.woff',  weight: '500', style: 'normal' },
  ],
  variable: '--font-sharp-medium20',
  display: 'swap',
})
*/

// Temporäre Fallback-Fonts
export const sharpBook20 = {
  variable: '--font-sharp-book20',
}
export const sharpMedium20 = {
  variable: '--font-sharp-medium20',
}

export const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
})