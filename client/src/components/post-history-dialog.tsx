
import { useState } from "react"
import { History, Copy } from "lucide-react"
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
import { toast } from "sonner"

interface PostHistoryDialogProps {
  posts: Array<{
    id: number
    post: string
  }>
}

export function PostHistoryDialog({ posts }: PostHistoryDialogProps) {
  const [open, setOpen] = useState(false)

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Post copied to clipboard!")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <History className="h-4 w-4 mr-2" />
          Post History
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Post History</DialogTitle>
          <DialogDescription>View all your previously generated posts.</DialogDescription>
        </DialogHeader>

        {posts.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            No posts generated yet. Create your first post to see it here.
          </div>
        ) : (
          <ScrollArea className="h-[60vh] mt-4">
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(post.post)}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                  <p className="text-sm mt-2 bg-muted p-3 rounded">{post.post}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  )
}

