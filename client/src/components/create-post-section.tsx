"use client"

import { motion } from "framer-motion"
import { PenSquare, Sparkles } from "lucide-react"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export function CreatePostSection() {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Card className="border-border/40 bg-card/50 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenSquare className="h-5 w-5 text-primary" />
            Create Engaging X Posts
          </CardTitle>
          <CardDescription>Craft attention-grabbing content for your audience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="text-sm leading-relaxed">
              Our AI-powered content creation tools help you craft compelling X posts that resonate with your audience.
              Generate ideas, optimize hashtags, and create viral-worthy content in seconds.
            </p>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/40 bg-card p-3">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
              <div>
                <h4 className="font-medium">AI Assistance</h4>
                <p className="text-xs text-muted-foreground">Get content suggestions tailored to your brand</p>
              </div>
            </div>
          </div>
          <Button className="w-full">Start Creating</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

