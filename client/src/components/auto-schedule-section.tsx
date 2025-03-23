import { motion } from "framer-motion"
import { Calendar, Clock } from "lucide-react"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export function AutoScheduleSection() {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Card className="border-border/40 bg-card/50 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Auto Schedule Your Posts
          </CardTitle>
          <CardDescription>Schedule your X posts for optimal engagement times</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="text-sm leading-relaxed">
              Our AI analyzes your audience's activity patterns and automatically schedules your posts for the times
              when they're most likely to engage. Boost your reach and engagement without the guesswork.
            </p>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/40 bg-card p-3">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <h4 className="font-medium">Smart Timing</h4>
                <p className="text-xs text-muted-foreground">Posts when your audience is most active</p>
              </div>
            </div>
          </div>
          <Button className="w-full">Explore Auto Scheduling</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

