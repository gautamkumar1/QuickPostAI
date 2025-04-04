import LazyLoad from "react-lazyload";
import { HeroHeader } from "@/components/hero5-header";
import Footer from "../footer/Footer";
import { lazy } from "react";
import HeroSection from "@/pages/hero-section/hero-section";
import HowItWorks from "../how-it-works/HowItWorks";

// Lazy load sections
// const HeroSection = lazy(() => import("@/pages/hero-section/hero-section"));
// const HowItWorks = lazy(() => import("../how-it-works/HowItWorks"));
const FeatureSectionQuickPostAI = lazy(() => import("../features/Features"));
const Faq = lazy(() => import("../faq/Faq"));
const TestimonalsDemo = lazy(() => import("../Testimonals/TestimonalsDemo"));

function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroHeader />
      <main>
        {/* <LazyLoad height={200} once>
          <section id="home">
            <HeroSection />
          </section>
        </LazyLoad> */}
                  <section id="home">
            <HeroSection />
          </section>

        {/* <LazyLoad height={200} once>
          <section id="how-it-works">
            <HowItWorks />
          </section>
        </LazyLoad> */}
        <section id="how-it-works">
            <HowItWorks />
          </section>

        <LazyLoad height={200} once>
          <section id="features">
            <FeatureSectionQuickPostAI />
          </section>
        </LazyLoad>

        <LazyLoad height={200} once>
          <section id="faq">
            <Faq />
          </section>
        </LazyLoad>

        <LazyLoad height={200} once>
          <section id="testimonials">
            <TestimonalsDemo />
          </section>
        </LazyLoad>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
