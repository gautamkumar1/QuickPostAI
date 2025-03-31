import { useState, useEffect } from "react";
import { m, motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, Send, X } from "lucide-react";
import { TimePickerDemo } from "@/components/time-picker";
import { useMutation } from "@tanstack/react-query";
import { connectTwitter } from "@/Api/api";
import useAuthStore from "@/zustand/authStore";
import { useSearchParams } from "react-router-dom";

function AutoSchedule() {
  const { isTwitterLoggedIn, setTwitterLoggedIn } = useAuthStore();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [content, setContent] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  const mutation = useMutation({
    mutationFn: connectTwitter,
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
      console.error("Error connecting to Twitter:", error);
    },
  });

  useEffect(() => {
    if (success === "true") {
      setTwitterLoggedIn(true);
    }
  }, [success, setTwitterLoggedIn]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setContent("");
    setDate(undefined);
    setIsScheduled(false);
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <motion.div className="space-y-6">
          <Card>
            <CardHeader>
              <motion.h2 className="text-2xl font-semibold text-center">Schedule Your Next Tweet</motion.h2>
              <motion.div className="mt-2 text-sm text-muted-foreground text-center">
                {!isTwitterLoggedIn && "To schedule tweets, please connect your X account first."}
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isTwitterLoggedIn ? (
                <div className="flex justify-center">
                  <Button onClick={handleConnect} disabled={isSubmitting} className="flex items-center gap-2">
                    {mutation.isPending ? "Connecting..." : "Connect to X"}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 text-primary" />
                    <span className="text-sm">Connected to X</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setTwitterLoggedIn(false)}>
                    Disconnect
                  </Button>
                </div>
              )}

              <div>
                <Label htmlFor="tweet-content">Tweet Content</Label>
                <Textarea
                  id="tweet-content"
                  placeholder="What's happening?"
                  className="min-h-[120px] mt-2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={!isTwitterLoggedIn}
                />
                <div className="text-right text-sm text-muted-foreground mt-1">{content.length}/280</div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="schedule" checked={isScheduled} onCheckedChange={setIsScheduled} />
                <Label htmlFor="schedule">Schedule for later</Label>
              </div>

              {isScheduled && (
                <div className="space-y-4">
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
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleSubmit} disabled={!isTwitterLoggedIn || !content || (isScheduled && !date) || isSubmitting}>
                {isSubmitting ? "Submitting..." : isScheduled ? "Schedule Tweet" : "Tweet Now"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Upcoming Tweets</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">No scheduled tweets yet. Create one above!</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default AutoSchedule;
