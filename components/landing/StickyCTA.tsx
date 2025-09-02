'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function StickyCTA() {
  const searchParams = useSearchParams()
  const currentLang = searchParams.get('lang') || 'de'
  const [isVisible, setIsVisible] = useState(false)
  
  const content = {
    de: {
      cta: 'Jetzt Angebot hochladen',
    },
    en: {
      cta: 'Upload quote now',
    }
  }

  const t = content[currentLang as keyof typeof content]

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero section
      setIsVisible(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 md:hidden">
      <Link href="/#upload" className="btn-primary w-full text-center">
        {t.cta}
      </Link>
    </div>
  )
}