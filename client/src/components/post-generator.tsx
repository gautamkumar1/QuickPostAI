
import type React from "react"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Copy, Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PostHistoryDialog } from "@/components/post-history-dialog"
import { TopicSuggestionsDialog } from "@/components/topic-suggestions-dialog"
import { toast } from "sonner"

// Mock API call - replace with your actual API
const generatePost = async (topic: string, tone: string): Promise<string> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const responses = {
    professional: `📊 New insights on ${topic}! Our latest analysis shows significant trends that could transform how we approach this space. What are your thoughts on the evolving landscape? #ProfessionalInsights #${topic.replace(/\s+/g, "")}`,
    casual: `Just thinking about ${topic} today... anyone else fascinated by this? Drop your thoughts below! 👇 #${topic.replace(/\s+/g, "")} #JustSaying`,
    humorous: `🤣 Who else is laughing about ${topic}? Can't believe this is still a thing in 2023! RT if you've been there too! #${topic.replace(/\s+/g, "")} #LOL`,
    controversial: `Hot take: ${topic} is not what everyone thinks it is. I've got some thoughts that might challenge the consensus... 🔥 #${topic.replace(/\s+/g, "")} #ChangeMyMind`,
    inspirational: `✨ The journey through ${topic} teaches us resilience and growth. Never give up on your dreams, even when the path seems unclear. #${topic.replace(/\s+/g, "")} #Motivation`,
  }

  return responses[tone as keyof typeof responses] || responses.casual
}
const toneOptions = [
    { value: "professional", label: "💼 Professional" },
    { value: "casual", label: "🤙 Casual" },
    { value: "humorous", label: "😄 Funny" },
    { value: "controversial", label: "📢 Bold & Direct" },
    { value: "inspirational", label: "🔥 Motivational" },
    { value: "chill", label: "✨ Chill" },
    { value: "insightful", label: "🤓 Smart & Insightful" },
    { value: "thoughtful", label: "🧠 Thoughtful" },
    { value: "relatable", label: "🤝 Relatable" },
    { value: "genz", label: "🗣️ Gen-Z Style (with slang)" }
  ];
  
export function PostGenerator() {
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("")
  const [generatedPost, setGeneratedPost] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [savedPosts, setSavedPosts] = useState<Array<{ topic: string; tone: string; content: string }>>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!topic || !tone) {
      toast.error("Please provide both a topic and tone.")
      return
    }

    setIsLoading(true)
    try {
      const post = await generatePost(topic, tone)
      setGeneratedPost(post)

      // Save to history
      setSavedPosts((prev) => [
        ...prev,
        {
          topic,
          tone,
          content: post,
        },
      ])
    } catch (error) {
      toast.error("Error generating post. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost)
    toast.success("Post copied to clipboard!")
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium">
              Topic
            </label>
            <Input
              id="topic"
              placeholder="Enter your topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tone" className="text-sm font-medium">
              Tone
            </label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
              {toneOptions.map((option) => (
  <SelectItem key={option.value} value={option.value}>
    {option.label}
  </SelectItem>
))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Generate Post
              </>
            )}
          </Button>

          <div className="hidden md:flex space-x-2">
            <PostHistoryDialog posts={savedPosts} />
            <TopicSuggestionsDialog onSelectTopic={(selectedTopic) => setTopic(selectedTopic)} />
          </div>
        </div>
      </form>

      {/* Mobile dialog buttons */}
      <div className="flex space-x-2 md:hidden">
        <PostHistoryDialog posts={savedPosts} />
        <TopicSuggestionsDialog onSelectTopic={(selectedTopic) => setTopic(selectedTopic)} />
      </div>

      <AnimatePresence>
        {generatedPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Generated Post</h3>
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="whitespace-pre-wrap">{generatedPost}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

