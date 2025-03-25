import {
    forwardRef,
    useEffect,
    useRef,
    useState,
    
  } from "react"
  import {
    AnimatePresence,
    motion,
  } from "framer-motion" // Changed from motion/react to framer-motion
  import Balancer from "react-wrap-balancer"
  import { cn } from "@/lib/utils"
  const Image = 'img'; // Use img HTML element directly
  // Types
  
  
  
  
  interface StaticImageData {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  
  interface ImageSet {
    step1light1: string | StaticImageData;
    step2light1: string | StaticImageData;
    step3light: string | StaticImageData;
    step4light: string | StaticImageData;
    alt: string;
  }
  
  interface HowItWorksCarouselProps {
    title?: string;
    description?: string;
    bgClass?: string;
    step1imgClass?: string;
    step2imgClass?: string;
    step3imgClass?: string;
    step4imgClass?: string;
    image: ImageSet;
  }
  
  
  interface StepImageProps {
    src: string | StaticImageData
    alt: string
    className?: string
    style?: React.CSSProperties
    width?: number
    height?: number
  }
  
  
  
  
  
  // Define step content
  const STEPS = [
    {
      id: "1",
      name: "Step 1",
      title: "Enter a Blog Post URL",
      description: "Provide the link to any blog post you find interesting."
    },
    {
      id: "2",
      name: "Step 2",
      title: "AI Scrapes and Extracts Blog Content",
      description: "Advanced AI extracts and analyzes the blog, ensuring no valuable information is missed."
    },
    {
      id: "3",
      name: "Step 3",
      title: "Summarizing the Blog",
      description: "We condense lengthy content into a valuable summary — no unnecessary fluff."
    },
    {
      id: "4",
      name: "Step 4",
      title: "Creating X Posts (< 280 Characters)",
      description: "Our AI generates engaging X posts from the summarized content. If the summary is over 280 characters, we split it into multiple impactful posts."
    }
  ];
  
  
  /**
   * Animation presets for reusable motion configurations.
   * Each preset defines the initial, animate, and exit states,
   * along with spring physics parameters for smooth transitions.
   */
  
  
  
 
  
  /**
   * Custom hook for managing cyclic transitions with auto-play functionality.
   * Handles both automatic cycling and manual transitions between steps.
   */
  
  
  
  
 
  
  
  
  const StepImage = forwardRef<
    HTMLImageElement,
    StepImageProps & { [key: string]: any }
  >(
    (
      { src, alt, className, style, width = 1200, height = 630, ...props },
      ref
    ) => {
      // Handle both string and StaticImageData types
      const imgSrc = typeof src === 'string' ? src : src.src;
      
      return (
        <Image
          ref={ref}
          alt={alt}
          className={className}
          src={imgSrc}
          width={width}
          height={height}
          style={{
            position: "absolute",
            userSelect: "none",
            maxWidth: "unset",
            ...style,
          }}
          {...props}
        />
      )
    }
  )
  StepImage.displayName = "StepImage"
  
  
  
  /**
   * Wrapper component for StepImage that applies animation presets.
   * Simplifies the application of complex animations through preset configurations.
   */
  
  
  /**
   * Main card component that handles mouse tracking for gradient effect.
   * Uses motion values to create an interactive gradient that follows the cursor.
   */
  
  
  
  const defaultClasses = {
    step1img: "pointer-events-none w-[80%] border border-stone-100/10 rounded-2xl",
    step2img: "pointer-events-none w-[80%] border border-stone-100/10 rounded-2xl",
    step3img: "pointer-events-none w-[80%] border border-stone-100/10 rounded-2xl",
    step4img: "pointer-events-none w-[80%] border border-stone-100/10 rounded-2xl"
  };
  
  export function HowItWorksCarousel({
    title = "How It Works — QuickPostAI",
    description = "Effortlessly transform lengthy blog posts into shareable X posts! QuickPostAI does the heavy lifting, so you can focus on sharing impactful content.",
    bgClass = "from-neutral-900/90 to-stone-800",
    step1imgClass = defaultClasses.step1img,
    step2imgClass = defaultClasses.step2img,
    step3imgClass = defaultClasses.step3img,
    step4imgClass = defaultClasses.step4img,
    image
  }: HowItWorksCarouselProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    
    // Auto-advance timer setup
    useEffect(() => {
      timerRef.current = setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % STEPS.length);
      }, 5000);
      
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [currentStep]);
    
    // Handle manual navigation
    const handleStepClick = (stepIndex: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setCurrentStep(stepIndex);
    };
    
    // Get the current image based on step
    const getCurrentImage = () => {
      switch(currentStep) {
        case 0: return { src: image.step1light1, className: step1imgClass };
        case 1: return { src: image.step2light1, className: step2imgClass };
        case 2: return { src: image.step3light, className: step3imgClass };
        case 3: return { src: image.step4light, className: step4imgClass };
        default: return { src: image.step1light1, className: step1imgClass };
      }
    };
  
    // Step indicator component
   // Replace the existing StepIndicator component with this modern version
const StepIndicator = () => {
    return (
      <nav aria-label="Progress" className="flex justify-center px-4 mb-8">
        <ol className="flex items-center space-x-3 md:space-x-6" role="list">
          {STEPS.map((step, index) => (
            <li key={step.id}>
              <button
                onClick={() => handleStepClick(index)}
                className={cn(
                  "px-3 py-2 rounded-full transition-all duration-300 text-sm font-medium",
                  currentStep === index
                    ? "bg-lime-500 text-black scale-105 shadow-lg"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/70"
                )}
                aria-current={currentStep === index ? "step" : undefined}
                aria-label={`Go to ${step.name}`}
              >
                {step.name}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    );
  };
    const currentImage = getCurrentImage();
    
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        {/* Step indicator dots */}
        <StepIndicator />
        
        {/* Main content card */}
        <div className={cn(
          "relative bg-gradient-to-b rounded-3xl border border-black/10 overflow-hidden",
          bgClass
        )}>
          <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Content section */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`content-${currentStep}`}
                className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4">
                  <span className="text-lime-400 font-medium text-sm">
                    {STEPS[currentStep].name}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {STEPS[currentStep].title}
                </h2>
                <p className="text-gray-300">
                  <Balancer>
                    {STEPS[currentStep].description}
                  </Balancer>
                </p>
                
               
              </motion.div>
            </AnimatePresence>
            
            {/* Image section */}
            <div className="w-full md:w-1/2 relative flex items-center justify-center p-6 md:p-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`image-${currentStep}`}
                  className="w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                >
                  <img
                    src={typeof currentImage.src === 'string' ? currentImage.src : currentImage.src.src}
                    alt={image.alt}
                    className={cn(currentImage.className)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default HowItWorksCarousel;