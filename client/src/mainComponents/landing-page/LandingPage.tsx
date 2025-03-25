import { HeroHeader } from "@/components/hero5-header";
import Footer from "../footer/Footer";
import { Suspense, lazy } from "react";
import HeroSection from "@/pages/hero-section/hero-section";

// Lazy load sections (except HeroSection)
const HowItWorks = lazy(() => import("../how-it-works/HowItWorks"));
const FeatureSectionQuickPostAI = lazy(() => import("../features/Features"));
const Faq = lazy(() => import("../faq/Faq"));
const TestimonalsDemo = lazy(() => import("../Testimonals/TestimonalsDemo"));

function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroHeader />
      <main>
        {/* No lazy loading for HeroSection */}
        <section id="home">
          <HeroSection />
        </section>

        <Suspense fallback={null}>
          <section id="how-it-works">
            <HowItWorks />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <section id="features">
            <FeatureSectionQuickPostAI />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <section id="faq">
            <Faq />
          </section>
        </Suspense>

        <Suspense fallback={null}>
          <section id="testimonials">
            <TestimonalsDemo />
          </section>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
