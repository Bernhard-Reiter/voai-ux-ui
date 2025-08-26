import { Suspense } from 'react'
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import TrustBar from '@/components/landing/TrustBar'
import Steps from '@/components/landing/Steps'
import USPGrid from '@/components/landing/USPGrid'
import Cases from '@/components/landing/Cases'
import SavingsCalculator from '@/components/landing/SavingsCalculator'
import Promises from '@/components/landing/Promises'
import FAQ from '@/components/landing/FAQ'
import Closer from '@/components/landing/Closer'
import StickyCTA from '@/components/landing/StickyCTA'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <Steps />
          <USPGrid />
          <Cases />
          <SavingsCalculator />
          <Promises />
          <FAQ />
          <Closer />
        </main>
        <Footer />
        <StickyCTA />
      </div>
    </Suspense>
  );
}
