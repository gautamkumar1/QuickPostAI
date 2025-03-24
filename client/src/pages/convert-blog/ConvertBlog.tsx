import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { tweetGenerate } from "@/Api/api";
import { toast } from "sonner";
interface TweetThread {
  threads: { tweet: string }[];
  totalThreads: number;
}

export default function ConvertBlog() {
  const [url, setUrl] = useState("");
  const [tweetThread, setTweetThread] = useState<TweetThread | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const mutation = useMutation({
    mutationFn:tweetGenerate,
    onSuccess:(data)=>{
      setTweetThread(data.tweetThread);
    },
    onError:(error:any)=>{
      console.log(`Error while generating tweet ${error}`);
      if (error.response?.status === 429) {
        toast.error("You have reached your daily request limit. Try again tomorrow.");
    } else {
        toast.error("Something went wrong. Please try again.");
    }
    }
  })
  const handleGenerateTweets = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(url);
    if (!url.trim()) return;
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
    {/* Top Section */}
    <div className="mb-8 text-center">
      <h2 className="text-4xl font-bold tracking-tight mb-3 text-primary">
        📄 Convert Blog to X Post
      </h2>
      <p className="text-muted-foreground text-lg">
        Transform your long-form blogs into impactful 280-character X posts in seconds! Note: You can convert up to <span className="font-semibold text-amber-300">3 blogs daily</span>.
      </p>
    </div>

    {/* Input Section */}
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      <Input
        type="url"
        placeholder="Paste your blog URL here..."
        className="flex-1 rounded-lg"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={mutation.isPending}
      />
      <Button 
        onClick={handleGenerateTweets}
        disabled={mutation.isPending || !url.trim()}
        className="w-full sm:w-auto rounded-lg"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Crafting X Posts...
          </>
        ) : (
          "Generate X Posts"
        )}
      </Button>
    </div>

    {/* Generated Tweets */}
    {tweetThread && (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-secondary-foreground">
        Copy, share, or tweak these X posts to match your style!
        </h3>
        
        <div className="space-y-3">
          {tweetThread.threads.map((thread, index) => (
            <Card key={index} className="rounded-lg shadow-md border border-muted p-4">
              <CardContent className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm text-white-900">{thread.tweet}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(thread.tweet, index)}
                  className="text-gray-600 hover:text-primary"
                >
                  {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardContent>
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