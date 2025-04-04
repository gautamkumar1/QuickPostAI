
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
// import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { IconBrandTwitter, IconArrowRight, IconCheck, IconLoader2 } from "@tabler/icons-react"


export default function HowItWorksSection() {
  const [_hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedPost, setSelectedPost] = useState(0)

  useEffect(() => {
    if (activeStep === 1) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 30)

      return () => clearInterval(interval)
    } else if (activeStep === null) {
      setProgress(0)
    }
  }, [activeStep])

  const handleCardClick = (index: number) => {
    setActiveStep(index === activeStep ? null : index)
  }

  return (
    <div className="relative z-10 py-16 px-4 max-w-7xl mx-auto mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-medium text-white mb-3">How QuickPostAI Works</h2>
        <p className="text-sm md:text-base text-purple-200/70 max-w-2xl mx-auto">
          Transform lengthy blog posts into shareable X content in seconds
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Step 1: URL Input - Larger cell */}
        <motion.div
          className={cn(
            "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20 overflow-hidden relative group cursor-pointer",
            activeStep === 0 ? "ring-2 ring-purple-500/50" : "hover:border-purple-500/40",
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ y: -5 }}
          onClick={() => handleCardClick(0)}
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 text-purple-400">
              <span className="text-lg font-semibold">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white mb-2">Paste blog link</h3>
              <p className="text-sm text-purple-200/70 mb-4">Provide any blog post URL you find interesting.</p>

              <AnimatePresence>
                {(activeStep === 0 || activeStep === null) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative mt-2">
                      <motion.input
                        type="text"
                        placeholder="https://example.com/blog-post"
                        className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-purple-500/30 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        whileFocus={{ scale: 1.01 }}
                      />
                      <motion.button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-md"
                        whileHover={{ scale: 1.05, backgroundColor: "#9333EA" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconArrowRight size={16} />
                      </motion.button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {["Medium", "Substack", "WordPress"].map((platform) => (
                        <motion.span
                          key={platform}
                          className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-md"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.3)" }}
                        >
                          {platform}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: activeStep !== null && activeStep >= 0 ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Step 2: AI Analysis - Medium cell */}
        <motion.div
          className={cn(
            "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-5 border border-blue-500/20 overflow-hidden relative group cursor-pointer",
            activeStep === 1 ? "ring-2 ring-blue-500/50" : "hover:border-blue-500/40",
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ y: -5 }}
          onClick={() => handleCardClick(1)}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 text-blue-400">
              <span className="text-lg font-semibold">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white mb-2">AI analyzes</h3>
              <p className="text-sm text-blue-200/70 mb-4">Our AI extracts key information from the blog.</p>

              <AnimatePresence>
                {(activeStep === 1 || activeStep === null) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="flex justify-center mb-3">
                      <motion.div
                        className="relative w-16 h-16 flex items-center justify-center"
                        animate={{ rotate: activeStep === 1 ? 360 : 0 }}
                        transition={{
                          duration: 3,
                          repeat: activeStep === 1 ? Number.POSITIVE_INFINITY : 0,
                          ease: "linear",
                        }}
                      >
                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={283}
                            strokeDashoffset={283 - (283 * progress) / 100}
                          />
                        </svg>
                        <span className="text-sm font-medium text-blue-400">{progress}%</span>
                      </motion.div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { label: "Extracting key points", done: progress > 30 },
                        { label: "Identifying main topics", done: progress > 60 },
                        { label: "Analyzing sentiment", done: progress > 80 },
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{
                            opacity: activeStep === 1 ? 1 : 0.7,
                            x: 0,
                            transition: { delay: idx * 0.2 },
                          }}
                        >
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center",
                              item.done ? "bg-blue-500" : "bg-neutral-700",
                            )}
                          >
                            {item.done ? (
                              <IconCheck size={12} className="text-white" />
                            ) : (
                              <IconLoader2 size={12} className="text-neutral-400 animate-spin" />
                            )}
                          </div>
                          <span className="text-xs text-blue-200/80">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500"
            initial={{ width: "0%" }}
            animate={{ width: activeStep !== null && activeStep >= 1 ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Step 3: Content Condensing - Medium cell */}
        <motion.div
          className={cn(
            "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/20 overflow-hidden relative group cursor-pointer",
            activeStep === 2 ? "ring-2 ring-cyan-500/50" : "hover:border-cyan-500/40",
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ y: -5 }}
          onClick={() => handleCardClick(2)}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400">
              <span className="text-lg font-semibold">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white mb-2">Content condensed</h3>
              <p className="text-sm text-cyan-200/70 mb-4">Long content becomes a concise summary.</p>

              <AnimatePresence>
                {(activeStep === 2 || activeStep === null) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          className="w-2 h-2 bg-cyan-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <span className="text-xs font-medium text-cyan-300">Condensing complete</span>
                      </div>
                      <span className="text-xs px-1.5 py-0.5 bg-cyan-900/30 text-cyan-300 rounded-md">
                        3.2k → 280 chars
                      </span>
                    </div>

                    <motion.div
                      className="relative overflow-hidden bg-neutral-800/50 rounded-md p-3 mb-2"
                      initial={{ height: 80 }}
                      animate={{ height: isExpanded ? 160 : 80 }}
                    >
                      <p className="text-xs text-cyan-200/80 line-clamp-3">
                        The future of AI looks promising with new advancements in machine learning algorithms.
                        Researchers have discovered that combining neural networks with symbolic reasoning creates more
                        powerful and explainable AI systems. This hybrid approach could be the key to the next wave of
                        AI breakthroughs. Industry experts predict that by 2030, AI will transform healthcare,
                        transportation, and other sectors with personalized medicine, autonomous vehicles, and smart
                        infrastructure becoming mainstream.
                      </p>

                      {!isExpanded && (
                        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-neutral-800/50 to-transparent" />
                      )}
                    </motion.div>

                    <motion.button
                      className="text-xs text-cyan-400 self-end flex items-center space-x-1 ml-auto"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsExpanded(!isExpanded)
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{isExpanded ? "Show less" : "Show more"}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.button>

                    <div className="p-3 bg-cyan-900/20 rounded-md border border-cyan-800/30 mt-2">
                      <p className="text-xs font-medium text-cyan-300">
                        Summarized: AI advancements combining neural networks with symbolic reasoning will transform
                        healthcare and transportation by 2030, according to industry experts.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-600 to-teal-500"
            initial={{ width: "0%" }}
            animate={{ width: activeStep !== null && activeStep >= 2 ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Step 4: X Post Generation - Larger cell */}
        <motion.div
          className={cn(
            "col-span-1 md:col-span-3 lg:col-span-6 row-span-1 bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-5 border border-teal-500/20 overflow-hidden relative group cursor-pointer",
            activeStep === 3 ? "ring-2 ring-teal-500/50" : "hover:border-teal-500/40",
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ y: -5 }}
          onClick={() => handleCardClick(3)}
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-500/20 text-teal-400">
              <span className="text-lg font-semibold">4</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white mb-2">X posts ready</h3>
              <p className="text-sm text-teal-200/70 mb-4">Engaging posts ready to share on X.</p>

              <AnimatePresence>
                {(activeStep === 3 || activeStep === null) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex space-x-2 mb-3">
                      {[0, 1].map((idx) => (
                        <motion.button
                          key={idx}
                          className={cn(
                            "w-6 h-1.5 rounded-full",
                            selectedPost === idx ? "bg-teal-500" : "bg-neutral-700",
                          )}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedPost(idx)
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedPost}
                        className="bg-neutral-800 rounded-lg border border-neutral-700 p-3 mb-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-8 h-8 rounded-full bg-neutral-700 overflow-hidden shrink-0">
                            <img
                              src="https://avatars.githubusercontent.com/u/91417015?v=4"
                              alt="Profile"
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-xs text-white">Gautam</span>
                              <span className="text-neutral-400 text-xs">@Paradoxical_xD</span>
                            </div>
                            <p className="text-xs text-neutral-200 mt-1">
                              {selectedPost === 0
                                ? "🔍 New AI research combines neural networks with symbolic reasoning, creating more powerful and explainable AI systems. This hybrid approach could be the key to the next wave of AI breakthroughs. #AIResearch #MachineLearning"
                                : "🚀 Industry experts predict AI will transform healthcare and transportation by 2030. Expect personalized medicine, autonomous vehicles, and smart infrastructure to become mainstream. The future is closer than we think! #FutureOfAI #Tech2030"}
                            </p>
                            <div className="flex items-center space-x-3 mt-2">
                              <motion.button
                                className="flex items-center space-x-1 text-neutral-500 hover:text-red-400 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                <span className="text-xs">24</span>
                              </motion.button>
                              <motion.button
                                className="flex items-center space-x-1 text-neutral-500 hover:text-teal-400 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                                </svg>
                                <span className="text-xs">12</span>
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex space-x-2">
                      <motion.button
                        className="flex-1 px-2 py-1.5 text-xs bg-neutral-800 text-neutral-300 rounded-md flex items-center justify-center space-x-1"
                        whileHover={{ scale: 1.02, backgroundColor: "#262626" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        <span>Edit</span>
                      </motion.button>
                      <motion.button
                        className="flex-1 px-2 py-1.5 text-xs bg-teal-600 text-white rounded-md flex items-center justify-center space-x-1"
                        whileHover={{ scale: 1.02, backgroundColor: "#0d9488" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <IconBrandTwitter className="h-3 w-3" />
                        <span>Post</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-600 to-emerald-500"
            initial={{ width: "0%" }}
            animate={{ width: activeStep !== null && activeStep >= 3 ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>

      {/* Progress steps at bottom */}
      <div className="flex justify-center mt-8 space-x-2">
        {[0, 1, 2, 3].map((step) => (
          <motion.button
            key={step}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              activeStep === step
                ? "bg-gradient-to-r from-purple-500 to-teal-500 w-8"
                : activeStep !== null && activeStep > step
                  ? "bg-gradient-to-r from-purple-500 to-teal-500"
                  : "bg-neutral-700",
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveStep(step)}
          />
        ))}
      </div>

     
    </div>
  )
}

