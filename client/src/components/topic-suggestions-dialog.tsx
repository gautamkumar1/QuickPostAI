
import { useState } from "react"
import { Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TopicSuggestionsDialogProps {
  onSelectTopic: (topic: string) => void
}

// Sample topic suggestions - you can replace with your own or fetch from an API
const TOPIC_SUGGESTIONS = [
    "🔥 JavaScript tricks I wish I knew earlier",
    "😵‍💫 My worst bug ever (and what it taught me)",
    "🧠 Clean code habits that actually make sense",
    "🚀 How I built a side project in 24 hours",
    "💼 Freelancing vs Full-time Dev: My take",
    "📈 Growing as a dev on X — what works in 2025",
    "🤖 Building with AI as a solo dev: worth it?",
    "📚 3 coding myths that held me back",
    "⚡ VS Code extensions that actually boost productivity",
    "☕ Hot take: TypeScript isn’t always necessary",
    "🔥 That one NPM package that changed everything",
    "🧩 Learning DSA in 2025 — still relevant?",
    "😬 When Git goes wrong: dev horror stories",
    "📊 Dev tools I can't live without",
    "🔒 Why every dev should understand basic security",
    "💡 How I explain complex tech to non-devs",
    "🌍 Open-source changed my life — here’s how",
    "🧵 Why every developer should build in public",
    "🛠️ React, Vue, Svelte: which one and why?",
    "👀 Underrated dev accounts you should follow on X"
  ];
  

export function TopicSuggestionsDialog({ onSelectTopic }: TopicSuggestionsDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSelectTopic = (topic: string) => {
    onSelectTopic(topic)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Lightbulb className="h-4 w-4 mr-2" />
          Topic Ideas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Topic Suggestions</DialogTitle>
          <DialogDescription>Choose from these popular topics to get started.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] mt-4">
          <div className="grid grid-cols-1 gap-2">
            {TOPIC_SUGGESTIONS.map((topic, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start h-auto py-3 px-4 text-left"
                onClick={() => handleSelectTopic(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

