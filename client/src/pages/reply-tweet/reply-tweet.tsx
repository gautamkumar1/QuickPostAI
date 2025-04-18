import { useState } from "react"
import { Copy, Loader2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function TweetReplyGenerator() {
  const [tweet, setTweet] = useState("")
  const [reply, setReply] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateReply = async () => {
    if (!tweet.trim()) return

    setIsGenerating(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // This is a mock response - in a real app, you'd call an API
      const responses = [
        "Thanks for sharing your thoughts! I completely agree with your perspective.",
        "Interesting point! I've been thinking about this too and have some additional thoughts.",
        "This is a great take! Would love to discuss this further sometime.",
        "You've articulated this perfectly. Couldn't have said it better myself.",
        "I see where you're coming from, though I have a slightly different perspective.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setReply(randomResponse)
      setIsGenerating(false)
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reply)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center justify-center p-4 sm:p-6">
      <div 
        className="w-full max-w-md mx-auto space-y-6 opacity-100"
      >
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-2">
            <MessageSquare className="text-gray-400 mr-2" size={24} />
            <h1 className="text-3xl font-bold text-gray-300 tracking-tight">Smart Reply</h1>
          </div>
          <p className="text-gray-500 text-sm">Generate thoughtful responses to any tweet</p>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Enter the tweet you want to reply to..."
            className="min-h-[120px] bg-gray-900 border border-gray-800 text-gray-200 resize-none focus:border-gray-600 focus:ring-gray-700"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />

          <Button
            onClick={generateReply}
            disabled={!tweet.trim() || isGenerating}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Crafting response...
              </>
            ) : (
              "Generate Smart Reply"
            )}
          </Button>
        </div>

        {reply && (
          <div className="space-y-3">
            <div className="relative">
              <div className="bg-gray-900 border border-gray-800 rounded-md p-4 text-gray-300">{reply}</div>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyToClipboard}
                className="absolute top-2 right-2 h-8 w-8 p-0 text-gray-500 hover:text-gray-300 hover:bg-gray-800"
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy to clipboard</span>
              </Button>
            </div>

            {copied && (
              <div className="text-center text-sm text-gray-400">
                Copied to clipboard!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}