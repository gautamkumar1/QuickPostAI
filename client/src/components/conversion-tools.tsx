import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function ConversionTools() {
  return (
    <Card className="border-border/40 bg-card/50 shadow-md">
      <CardHeader>
        <CardTitle>Conversion Tools</CardTitle>
        <CardDescription>Convert your blog posts to X posts in seconds</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Paste Blog URL or Text..." className="pl-9" />
          </div>
          <Button className="gap-2 bg-[#1DA1F2] text-white hover:bg-[#1a94df]">
            <X className="h-4 w-4" />
            Generate X Post
          </Button>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="flex-1">
            Convert Blog Now
          </Button>
          <Button variant="secondary" className="flex-1">
            Explore Features
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

