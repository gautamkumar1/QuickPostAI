import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, Copy, Check } from "lucide-react";

export default function ConvertBlog() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  interface TweetThread {
    threads: { tweet: string }[];
    totalThreads: number;
  }
  
  const [tweetThread, setTweetThread] = useState<TweetThread | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Dummy data for demonstration
  const dummyData = {
    message: "Tweet thread generated successfully",
    tweetThread: {
      threads: [
        {
          tweet:
            "Still wrestling with NextJS Server Actions and Shadcn/ui? This blog post is yet another tutorial promising to make your life easier. The author walks you through creating a project dialog box, focusing on client-side rendering and integrating (1/2)",
        },
        {
          tweet:
            "Shadcn's UI components. The core idea? A dialog where users punch in project names, see a loading state, and then BAM—new project in their dashboard. The code snippet provided is a basic dialog skeleton. (2/2)",
        },
      ],
      totalThreads: 2,
    },
  };

  const handleGenerateTweets = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setTweetThread(dummyData.tweetThread);
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        {/* Header content could go here */}
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Convert Blog Posts to Tweets
            </h2>
            <p className="text-muted-foreground">
              Enter your blog URL and let AI generate engaging tweets for your content
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Input
              type="url"
              placeholder="Enter your blog URL"
              className="flex-1"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
            <Button 
              onClick={handleGenerateTweets}
              disabled={isLoading || !url.trim()}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Tweets"
              )}
            </Button>
          </div>

          {tweetThread && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">
                Here is total - {tweetThread.totalThreads} tweets generated
              </h3>
              
              <div className="space-y-4">
                {tweetThread.threads.map((thread, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-500 font-medium">X</span>
                        </div>
                        <div>
                          <div className="font-medium">Tweet {index + 1}</div>
                          <p className="mt-2 text-gray-700">{thread.tweet}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 pb-3 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(thread.tweet, index)}
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}