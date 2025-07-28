import { HeroSection } from './_components/hero-section'
import { FeaturesSection } from './_components/features-section'
import { HowItWorksSection } from './_components/how-it-works-section'
import { PricingSection } from './_components/pricing-section'
import { CTASection } from './_components/cta-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
    </>
  )
}
