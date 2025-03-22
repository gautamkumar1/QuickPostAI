
import HowItWorksCarousel from "@/components/ui/featureCarousel"
import Image1 from "../../../image/step1.png"
import Image2 from "../../../image/step2.png"
import Image3 from "../../../image/step3.png"
import Image4 from "../../../image/step4.png"
import { cn } from "@/lib/utils"
function HowItWorks() {
    return (
        <HowItWorksCarousel
        title="How It Works"
        description="Effortlessly transform lengthy blog posts into shareable X posts!"
        step1imgClass={cn(
          "pointer-events-none w-[80%] border border-stone-100/10",
          "rounded-2xl",
          "hover:scale-105 transition-transform"
        )}
        image={{
          step1light1: Image1, // First step image
          step2light1: Image2, // Second step image
          step3light: Image3,  // Third step image
          step4light: Image4,  // Fourth step image
          alt: "Feature showcase",
        }}
        bgClass="bg-[#0A0B0B]"
      />
    )
  }
  
    export default HowItWorks