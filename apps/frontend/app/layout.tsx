import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import { ErrorBoundary } from '@/components/error-boundary'
import { ToastProvider } from '@/components/toast-provider'
import { AuthProvider } from '@voai/shared'
import { CookieConsent } from '@/components/cookie-consent'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'VOAI - KI-gestützte Preisverhandlungen',
  description:
    'Automatisierte Preisverhandlungen mit fortschrittlicher KI-Technologie für maximale Ersparnisse',
  keywords: 'KI, Preisverhandlung, Automatisierung, Sparen, Verhandlung, AI',
  authors: [{ name: 'VOAI Team' }],
  creator: 'VOAI',
  publisher: 'VOAI',
  metadataBase: new URL('https://voai.ai'),
  alternates: {
    canonical: '/',
    languages: {
      de: '/de',
      en: '/en',
    },
  },
  openGraph: {
    title: 'VOAI - KI-gestützte Preisverhandlungen',
    description: 'Sparen Sie durchschnittlich 23% mit unserer KI-Verhandlungstechnologie',
    url: 'https://voai.ai',
    siteName: 'VOAI',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VOAI - KI-gestützte Preisverhandlungen',
    description: 'Sparen Sie durchschnittlich 23% mit unserer KI-Verhandlungstechnologie',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1d1d1f' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" dir="ltr" suppressHydrationWarning className={inter.variable}>
      <body
        className={`${inter.className} bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ErrorBoundary>
              <Navigation />
              <div className="flex-1 pt-16">
                <main role="main" className="min-h-screen">
                  {children}
                </main>
              </div>
              <Footer />
              <ToastProvider />
              <CookieConsent />
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
