import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, Send, Twitter } from "lucide-react"
import { TimePickerDemo } from "@/components/time-picker"

function AutoSchedule() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [content, setContent] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setContent("")
    setDate(undefined)
    setIsScheduled(false)
    // Here you would normally send the data to your API
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <motion.h2
                  className="text-2xl font-semibold text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Schedule Your Next Tweet
                </motion.h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div variants={itemVariants}>
                  <Label htmlFor="tweet-content">Tweet Content</Label>
                  <Textarea
                    id="tweet-content"
                    placeholder="What's happening?"
                    className="min-h-[120px] mt-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="text-right text-sm text-muted-foreground mt-1">{content.length}/280</div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center space-x-2">
                  <Switch id="schedule" checked={isScheduled} onCheckedChange={setIsScheduled} />
                  <Label htmlFor="schedule">Schedule for later</Label>
                </motion.div>

                {isScheduled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal mt-2">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label>Time</Label>
                        <div className="mt-2">
                          <TimePickerDemo />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter>
                <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!content || (isScheduled && !date) || isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                      </motion.div>
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    {isScheduled ? "Schedule Tweet" : "Tweet Now"}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Upcoming Tweets</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">No scheduled tweets yet. Create one above!</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default AutoSchedule