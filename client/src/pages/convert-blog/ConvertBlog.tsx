import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, Copy, Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { tweetGenerate } from "@/Api/api";
import { m } from "framer-motion";
interface TweetThread {
  threads: { tweet: string }[];
  totalThreads: number;
}

export default function ConvertBlog() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tweetThread, setTweetThread] = useState<TweetThread | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const mutation = useMutation({
    mutationFn:tweetGenerate,
    onSuccess:(data)=>{
      alert("Tweet thread generated successfully");
      setTweetThread(data.tweetThread);
    },
    onError:(error)=>{
      console.log(`Error while generating tweet ${error}`);
    }
  })
  // // Dummy data for demonstration
  // const dummyData = {
  //   message: "Tweet thread generated successfully",
  //   tweetThread: {
  //     threads: [
  //       {
  //         tweet:
  //           "Still wrestling with NextJS Server Actions and Shadcn/ui? This blog post is yet another tutorial promising to make your life easier. The author walks you through creating a project dialog box, focusing on client-side rendering and integrating (1/2)",
  //       },
  //       {
  //         tweet:
  //           "Shadcn's UI components. The core idea? A dialog where users punch in project names, see a loading state, and then BAM—new project in their dashboard. The code snippet provided is a basic dialog skeleton. (2/2)",
  //       },
  //     ],
  //     totalThreads: 2,
  //   },
  // };

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
    // <div className="min-h-screen bg-background">
    //   <header className="container mx-auto py-6 px-4 flex justify-between items-center">
    //     {/* Header content could go here */}
    //   </header>
    //   <main className="container mx-auto px-4 py-8">
    //     <div className="max-w-3xl mx-auto">
    //       <div className="mb-8 text-center">
    //         <h2 className="text-3xl font-bold tracking-tight mb-2">
    //           Convert Blog Posts to Tweets
    //         </h2>
    //         <p className="text-muted-foreground">
    //           Enter your blog URL and let AI generate engaging tweets for your content
    //         </p>
    //       </div>

    //       <div className="flex flex-col sm:flex-row gap-3 mb-8">
    //         <Input
    //           type="url"
    //           placeholder="Enter your blog URL"
    //           className="flex-1"
    //           value={url}
    //           onChange={(e) => setUrl(e.target.value)}
    //           disabled={mutation.isPending}
    //         />
    //         <Button 
    //           onClick={handleGenerateTweets}
    //           disabled={mutation.isPending || !url.trim()}
    //           className="w-full sm:w-auto"
    //         >
    //           {mutation.isPending ? (
    //             <>
    //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    //               Generating...
    //             </>
    //           ) : (
    //             "Generate Tweets"
    //           )}
    //         </Button>
    //       </div>

    //       {tweetThread && (
    //         <div className="space-y-6">
    //           <h3 className="text-xl font-semibold">
    //             Here is total - {tweetThread.totalThreads} tweets generated
    //           </h3>
              
    //           <div className="space-y-4">
    //             {tweetThread.threads.map((thread, index) => (
    //               <Card key={index} className="overflow-hidden">
    //                 <CardContent className="pt-6">
    //                   <div className="flex items-start gap-3">
    //                     <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
    //                       <span className="text-blue-500 font-medium">X</span>
    //                     </div>
    //                     <div>
    //                       <div className="font-medium">Tweet {index + 1}</div>
    //                       <p className="mt-2 text-gray-700">{thread.tweet}</p>
    //                     </div>
    //                   </div>
    //                 </CardContent>
    //                 <CardFooter className="pt-0 pb-3 flex justify-end">
    //                   <Button
    //                     variant="outline"
    //                     size="sm"
    //                     onClick={() => copyToClipboard(thread.tweet, index)}
    //                   >
    //                     {copiedIndex === index ? (
    //                       <>
    //                         <Check className="h-4 w-4 mr-1" />
    //                         Copied
    //                       </>
    //                     ) : (
    //                       <>
    //                         <Copy className="h-4 w-4 mr-1" />
    //                         Copy
    //                       </>
    //                     )}
    //                   </Button>
    //                 </CardFooter>
    //               </Card>
    //             ))}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </main>
    // </div>
    <div className="min-h-screen bg-background">
  <header className="container mx-auto py-6 px-4 flex justify-between items-center">
    {/* Header content could go here */}
  </header>
  <main className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-3 text-primary">
        📄 Convert Blog to X Post
        </h2>
        <p className="text-muted-foreground text-lg">
          Enter your blog URL and let AI craft engaging tweets for your content.
        </p>
      </div>
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
              Generating...
            </>
          ) : (
            "Generate Tweets"
          )}
        </Button>
      </div>

      {tweetThread && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-secondary-foreground">
            {tweetThread.totalThreads} AI-Generated Tweets
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