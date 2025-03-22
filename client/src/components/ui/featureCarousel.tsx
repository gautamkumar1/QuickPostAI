import {
    forwardRef,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
    type MouseEvent,
  } from "react"
  import cult from "../../../image/cult.jpg" // Make sure this image exists in your assets
  import clsx from "clsx"
  import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useMotionValue,
    type MotionStyle,
    type MotionValue,
    type Variants,
  } from "framer-motion" // Changed from motion/react to framer-motion
  import Balancer from "react-wrap-balancer"
  import { cn } from "@/lib/utils"
  const Image = 'img'; // Use img HTML element directly
  // Types
  type WrapperStyle = MotionStyle & {
    "--x": MotionValue<string>
    "--y": MotionValue<string>
  }
  
  interface CardProps {
    title: string
    description: string
    bgClass?: string
  }
  
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
  
  interface Step {
    id: string
    name: string
    title: string
    description: string
  }
  
  // Constants
  const TOTAL_STEPS = 4
  
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
  const ANIMATION_PRESETS = {
    fadeInScale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: {
        type: "spring",
        stiffness: 300, // Higher value = more rigid spring
        damping: 25, // Higher value = less oscillation
        mass: 0.5, // Lower value = faster movement
      },
    },
    slideInRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.5,
      },
    },
    slideInLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.5,
      },
    },
  } as const
  
  type AnimationPreset = keyof typeof ANIMATION_PRESETS
  
  interface AnimatedStepImageProps extends StepImageProps {
    preset?: AnimationPreset
    delay?: number
    onAnimationComplete?: () => void
  }
  
  /**
   * Custom hook for managing cyclic transitions with auto-play functionality.
   * Handles both automatic cycling and manual transitions between steps.
   */
  function useNumberCycler(
    totalSteps: number = TOTAL_STEPS,
    interval: number = 3000
  ) {
    const [currentNumber, setCurrentNumber] = useState(0)
    const [isManualInteraction, setIsManualInteraction] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
    // Setup timer function
    const setupTimer = useCallback(() => {
      console.log("Setting up timer")
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
  
      timerRef.current = setTimeout(() => {
        console.log("Timer triggered, advancing to next step")
        setCurrentNumber((prev) => (prev + 1) % totalSteps)
        setIsManualInteraction(false)
        // Recursively setup next timer
        setupTimer()
      }, interval)
    }, [interval, totalSteps])
  
    // Handle manual increment
    const increment = useCallback(() => {
      console.log("Manual increment triggered")
      setIsManualInteraction(true)
      setCurrentNumber((prev) => (prev + 1) % totalSteps)
  
      // Reset timer on manual interaction
      setupTimer()
    }, [totalSteps, setupTimer])
  
    // Initial timer setup and cleanup
    useEffect(() => {
      console.log("Initial timer setup")
      setupTimer()
  
      return () => {
        console.log("Cleaning up timer")
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
      }
    }, [setupTimer])
  
    // Debug logging
    useEffect(() => {
      console.log("Current state:", {
        currentNumber,
        isManualInteraction,
        hasTimer: !!timerRef.current,
      })
    }, [currentNumber, isManualInteraction])
  
    return {
      currentNumber,
      increment,
      isManualInteraction,
    }
  }
  
  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)
  
    useEffect(() => {
      const userAgent = navigator.userAgent
      const isSmall = window.matchMedia("(max-width: 768px)").matches
      const isMobile = Boolean(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
          userAgent
        )
      )
  
      const isDev = import.meta.env.DEV // Changed from process.env.NODE_ENV for Vite
      if (isDev) setIsMobile(isSmall || isMobile)
  
      setIsMobile(isSmall && isMobile)
    }, [])
  
    return isMobile
  }
  
  // Components
  function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        fill="currentColor"
        className={cn("h-4 w-4", className)}
        {...props}
      >
        <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
      </svg>
    )
  }
  
  const stepVariants: Variants = {
    inactive: {
      scale: 0.8,
      opacity: 0.5,
    },
    active: {
      scale: 1,
      opacity: 1,
    },
  }
  
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
  
  const MotionStepImage = motion(StepImage)
  
  /**
   * Wrapper component for StepImage that applies animation presets.
   * Simplifies the application of complex animations through preset configurations.
   */
  const AnimatedStepImage = ({
    preset = "fadeInScale",
    delay = 0,
    onAnimationComplete,
    ...props
  }: AnimatedStepImageProps) => {
    const presetConfig = ANIMATION_PRESETS[preset]
    return (
      <MotionStepImage
        {...props}
        {...presetConfig}
        transition={{
          ...presetConfig.transition,
          delay,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    )
  }
  
  /**
   * Main card component that handles mouse tracking for gradient effect.
   * Uses motion values to create an interactive gradient that follows the cursor.
   */
  function FeatureCard({
    bgClass,
    children,
    step,
  }: CardProps & {
    children: React.ReactNode
    step: number
  }) {
    const [mounted, setMounted] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const isMobile = useIsMobile()
  
    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
      if (isMobile) return
      const { left, top } = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }
  
    useEffect(() => {
      setMounted(true)
    }, [])
  
    return (
      <motion.div
        className="animated-cards relative w-full rounded-[16px]"
        onMouseMove={handleMouseMove}
        style={
          {
            "--x": useMotionTemplate`${mouseX}px`,
            "--y": useMotionTemplate`${mouseY}px`,
          } as WrapperStyle
        }
      >
        <div
          className={clsx(
            "group relative w-full overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-neutral-900/90 to-stone-800 transition duration-300 dark:[#0A0B0B] dark:transparent",
            "md:hover:border-transparent",
            bgClass
          )}
        >
          <div className="m-10 min-h-[450px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="flex w-4/6 flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <motion.h2
                  className="text-xl font-bold tracking-tight text-white md:text-2xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.3,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {STEPS[step].title}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.3,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <p className="text-sm leading-5 text-neutral-300 sm:text-base sm:leading-5 dark:text-zinc-400">
                    <Balancer>{STEPS[step].description}</Balancer>
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
            {mounted ? children : null}
          </div>
        </div>
      </motion.div>
    )
  }
  
  /**
   * Progress indicator component that shows current step and completion status.
   * Handles complex state transitions and animations for step indicators.
   */
  function Steps({
    steps,
    current,
    onChange,
  }: {
    steps: readonly Step[]
    current: number
    onChange: (index: number) => void
  }) {
    return (
      <nav aria-label="Progress" className="flex justify-center px-4">
        <ol
          className="flex w-full flex-wrap items-start justify-start gap-2 sm:justify-center md:w-10/12 md:divide-y-0"
          role="list"
        >
          {steps.map((step, stepIdx) => {
            // Calculate step states for styling and animations
            const isCompleted = current > stepIdx
            const isCurrent = current === stepIdx
            const isFuture = !isCompleted && !isCurrent
  
            return (
              <motion.li
                key={`${step.name}-${stepIdx}`}
                initial="inactive"
                animate={isCurrent ? "active" : "inactive"}
                variants={stepVariants}
                transition={{ duration: 0.3 }}
                className={cn(
                  "relative z-50 rounded-full px-3 py-1 transition-all duration-300 ease-in-out md:flex",
                  isCompleted ? "bg-neutral-500/20" : "bg-neutral-500/10"
                )}
              >
                <div
                  className={cn(
                    "group flex w-full cursor-pointer items-center focus:outline-none focus-visible:ring-2",
                    (isFuture || isCurrent) && "pointer-events-none"
                  )}
                  onClick={() => onChange(stepIdx)}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <motion.span
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.2 : 1,
                      }}
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full duration-300",
                        isCompleted &&
                          "bg-brand-400 text-white dark:bg-brand-400",
                        isCurrent &&
                          "bg-brand-300/80 text-neutral-400 dark:bg-neutral-500/50",
                        isFuture && "bg-brand-300/10 dark:bg-neutral-500/20"
                      )}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <IconCheck className="h-3 w-3 stroke-white stroke-[3] text-white dark:stroke-black" />
                        </motion.div>
                      ) : (
                        <span
                          className={cn(
                            "text-xs",
                            !isCurrent && "text-[#C6EA7E]"
                          )}
                        >
                          {stepIdx + 1}
                        </span>
                      )}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={clsx(
                        "text-sm font-medium duration-300",
                        isCompleted && "text-muted-foreground",
                        isCurrent && "text-lime-300 dark:text-lime-500",
                        isFuture && "text-neutral-500"
                      )}
                    >
                      {step.name}
                    </motion.span>
                  </span>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </nav>
    )
  }
  
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