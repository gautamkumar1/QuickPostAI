import HeroSection from "@/pages/hero-section/hero-section"
import HowItWorks from "../how-it-works/HowItWorks"
import FeatureSectionQuickPostAI from "../features/Features"

function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="flex flex-col items-center justify-center">
        <HowItWorks/>
        <FeatureSectionQuickPostAI />
      </div>

    </div>
  )
}

export default LandingPage