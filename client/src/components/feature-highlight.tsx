import { motion } from "framer-motion"
import { ArrowRight, X } from "lucide-react"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

export function FeatureHighlight() {
  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Card className="overflow-hidden border-border/40 bg-gradient-to-br from-primary/10 via-card/80 to-card shadow-lg">
        <CardContent className="p-0">
          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Conversion Tools</h2>
              <p className="text-muted-foreground">
                Transform your long-form blog content into engaging X threads with our AI-powered conversion tools. Our
                platform analyzes your content and creates perfectly formatted tweets that capture your audience's
                attention.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2 bg-[#476b25] text-white hover:bg-[#455a32]">
                  <X className="h-4 w-4" />
                  Try It Now
                </Button>
                <Button variant="outline" className="gap-1">
                  Learn More
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="hidden items-center justify-center md:flex">
              <div className="relative h-48 w-48">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"></div>
                <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-card/50 p-4 backdrop-blur-sm">
                  <X className="h-24 w-24 text-primary/80" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

