

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, X, Copy, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

// Tool data
const engageTools = [
  {
    id: "tweet-reply",
    name: "Tweet Reply Generator",
    description: "Generate engaging replies to tweets that drive conversation",
    icon: "💬",
    category: "replies",
    placeholder: "Paste the tweet you want to reply to...",
    buttonText: "Generate Reply",
  },
  {
    id: "quote-tweet",
    name: "Quote Tweet Creator",
    description: "Create thoughtful quote tweets that add value",
    icon: "🔄",
    category: "quotes",
    placeholder: "Paste the tweet you want to quote...",
    buttonText: "Generate Quote",
  },
  {
    id: "thread-builder",
    name: "Thread Builder",
    description: "Craft compelling tweet threads that tell a story",
    icon: "🧵",
    category: "threads",
    placeholder: "Describe the topic for your thread...",
    buttonText: "Generate Thread",
  },
  {
    id: "viral-tweet",
    name: "Viral Tweet Creator",
    description: "Create tweets designed to maximize engagement",
    icon: "🚀",
    category: "tweets",
    placeholder: "What topic do you want to tweet about?",
    buttonText: "Generate Viral Tweet",
  },
  {
    id: "engagement-hooks",
    name: "Engagement Hooks",
    description: "Generate hooks that drive likes, replies and retweets",
    icon: "🎣",
    category: "engagement",
    placeholder: "What topic do you want engagement hooks for?",
    buttonText: "Generate Hooks",
  },
  {
    id: "hashtag-generator",
    name: "Hashtag Generator",
    description: "Find the perfect hashtags for maximum reach",
    icon: "#️⃣",
    category: "hashtags",
    placeholder: "What's your tweet or content about?",
    buttonText: "Generate Hashtags",
  },
  {
    id: "content-repurposer",
    name: "Content Repurposer",
    description: "Turn existing content into engaging tweets",
    icon: "♻️",
    category: "content",
    placeholder: "Paste your content to repurpose (article, blog post, etc.)...",
    buttonText: "Repurpose Content",
  },
  {
    id: "poll-creator",
    name: "Poll Creator",
    description: "Create engaging polls that drive participation",
    icon: "📊",
    category: "polls",
    placeholder: "What topic do you want to create a poll about?",
    buttonText: "Generate Poll",
  },
]

export default function EngageLabDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTool, setSelectedTool] = useState<(typeof engageTools)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [generatedResponse, setGeneratedResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Filter tools based on search query
  const filteredTools = engageTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle tool selection
  const handleToolSelect = (tool: (typeof engageTools)[0]) => {
    setSelectedTool(tool)
    setUserInput("")
    setGeneratedResponse("")
    setIsDialogOpen(true)
  }

  // Handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setTimeout(() => {
      setSelectedTool(null)
      setUserInput("")
      setGeneratedResponse("")
    }, 300)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    setIsGenerating(true)
    setGeneratedResponse("")

    try {
      // Simulate API call to AI service
      // In a real implementation, you would call your AI service here
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock responses based on tool type
      let response = ""

      switch (selectedTool?.id) {
        case "tweet-reply":
          response = `Great point! I've been thinking about this too. The key insight many miss is how this connects to broader industry trends. What's your take on how this might evolve over the next year? #ThoughtLeadership`
          break
        case "quote-tweet":
          response = `This is a game-changing perspective that deserves more attention. The implications for how we approach digital engagement are profound. \n\nParticularly insightful is the point about audience retention - something we all need to consider more deeply.`
          break
        case "thread-builder":
          response = `1/ Let's talk about ${userInput.split(" ").slice(0, 3).join(" ")}. This topic is transforming how we think about digital engagement.\n\n2/ First, we need to understand the core principles: authenticity, value-delivery, and consistent presence.\n\n3/ The most successful creators know that ${userInput.split(" ").slice(0, 2).join(" ")} isn't just about broadcasting - it's about building relationships.\n\n4/ Here's what most people miss: engagement isn't just metrics. It's about creating meaningful interactions that build loyalty over time.\n\n5/ My favorite strategy? Focus on asking questions that spark genuine conversation rather than just seeking agreement.`
          break
        case "viral-tweet":
          response = `Hot take: The most underrated skill in digital marketing isn't content creation or analytics - it's empathy.\n\nUnderstanding your audience so deeply that your content feels personally created for each individual is the real growth hack.\n\nAgree or am I missing something?`
          break
        default:
          response = `Here's your generated content for ${selectedTool?.name}:\n\n${userInput.split(" ").slice(0, 3).join(" ")} is a fascinating topic that deserves more attention. I've found that approaching this with a fresh perspective yields the best results. What are your thoughts?`
      }

      setGeneratedResponse(response)
    } catch (error) {
      toast.error("An error occurred while generating the response. Please try again.")
      console.log(error);
      
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResponse)
    toast.success("Response copied to clipboard!")
  }

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-[#0B0A0B] text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Engage Lab
          </h1>
          <p className="text-gray-400">AI-powered tools to enhance your engagement on X</p>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-6 bg-gray-900 border-gray-800 text-gray-100 placeholder:text-gray-500 focus-visible:ring-blue-600"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tools grid */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {filteredTools.map((tool) => (
    <motion.div
      key={tool.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card
        className="bg-[#121113] border border-[#1E1D20] hover:border-indigo-500/70 transition-all cursor-pointer overflow-hidden group shadow-lg"
        onClick={() => handleToolSelect(tool)}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="text-3xl mb-2 text-indigo-400 group-hover:text-indigo-300 transition-colors">{tool.icon}</div>
            <Badge variant="outline" className="bg-[#18171A] text-gray-300 border-[#2D2B30]">
              {tool.category}
            </Badge>
          </div>
          <CardTitle className="text-xl text-gray-100 group-hover:text-indigo-300 transition-colors">
            {tool.name}
          </CardTitle>
          <CardDescription className="text-gray-400">{tool.description}</CardDescription>
        </CardHeader>
        <CardFooter className="pt-0">
          <Button
            variant="default"
            className="w-full bg-[#1A191C] hover:bg-indigo-600 text-gray-200 border border-[#2D2B30] hover:border-indigo-500 rounded-lg py-2 font-medium transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md"
          >
            <span>Use Tool</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  ))}
</div>
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No tools found matching your search.</p>
          </div>
        )}

        {/* Tool dialog */}
        {selectedTool && (
  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogContent className="bg-[#121113] border border-[#1E1D20] text-gray-100 sm:max-w-[600px] shadow-xl">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <span className="text-2xl text-indigo-400">{selectedTool.icon}</span>
          <DialogTitle className="text-xl font-semibold">{selectedTool.name}</DialogTitle>
        </div>
        <DialogDescription className="text-gray-400 mt-2">{selectedTool.description}</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-5 mt-2">
        <Textarea
          placeholder={selectedTool.placeholder}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="min-h-[120px] bg-[#18171A] border-[#2D2B30] text-gray-100 placeholder:text-gray-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-lg resize-y"
        />

        {generatedResponse && (
          <div className="relative mt-5">
            <div className="bg-[#18171A] border border-[#2D2B30] rounded-lg p-4 text-gray-100 whitespace-pre-line shadow-md">
              {generatedResponse}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="absolute top-2 right-2 h-8 w-8 text-gray-400 hover:text-indigo-400 hover:bg-[#2D2B30]/80 rounded-full transition-colors"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleDialogClose}
            className="border-[#2D2B30] text-gray-300 hover:bg-[#2D2B30] hover:text-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!userInput.trim() || isGenerating}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md hover:shadow-indigo-800/20 flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <span>{selectedTool.buttonText}</span>
                {!isGenerating && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h15" />
                  </svg>
                )}
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
)}
      </div>
    </div>
  )
}
