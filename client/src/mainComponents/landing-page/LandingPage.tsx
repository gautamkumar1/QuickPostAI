import HeroSection from "@/pages/hero-section/hero-section"
import HowItWorks from "../how-it-works/HowItWorks"
import FeatureSectionQuickPostAI from "../features/Features"
import { HeroHeader } from "@/components/hero5-header"
import Footer from "../footer/Footer"

function LandingPage() {
  return (
    <div className="min-h-screen">
     <HeroHeader />
      <main>
      <HeroSection />
        <section id="how-it-works">
        <HowItWorks/>
        </section>
        <section id="features">
          <FeatureSectionQuickPostAI />

        </section>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage