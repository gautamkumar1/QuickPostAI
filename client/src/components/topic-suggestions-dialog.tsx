
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
  "Artificial Intelligence in Healthcare",
  "Sustainable Fashion Trends",
  "Remote Work Best Practices",
  "Cryptocurrency Market Analysis",
  "Mental Health Awareness",
  "Space Exploration Breakthroughs",
  "Plant-Based Diet Benefits",
  "Digital Marketing Strategies",
  "Smart Home Technology",
  "Personal Finance Tips",
  "Travel Destinations 2023",
  "Fitness and Wellness Routines",
  "Climate Change Solutions",
  "NFTs and Digital Art",
  "Productivity Hacks",
  "Electric Vehicle Innovations",
  "Mindfulness and Meditation",
  "Startup Success Stories",
  "Gaming Industry Trends",
  "Parenting in the Digital Age",
]

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

