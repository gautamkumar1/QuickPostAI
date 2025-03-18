import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers"
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  modelName: "gemini-2.0-flash",
  temperature: 0,
  response_format: "text"
});

const loadWebContent = async (url) => {
  const loader = new CheerioWebBaseLoader(url);
  return await loader.load();
};

const summarizeBlogContent = async (docs) => {
    const webContentText = docs.map((doc) => doc.pageContent).join("\n");

    const summarizePrompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            `You're not just summarizing a blog—you’re slicing through the nonsense and serving up **only the juiciest insights**. 
        
            ## **Your Mission (If You Can Handle It)**
            - **Start Strong**: Hit the reader with a bold question or a reality check. No boring intros.
            - **Break It Down Like They’re Five**: If you need a PhD to understand it, you failed.
            - **Call Out the BS**: If something is overhyped, say it. If it's underrated, expose it.
            - **Inject Some Personality**: No robotic summaries—**sass, wit, and attitude are welcome**.
            - **Make Them Think**: Drop a hot take that challenges conventional wisdom.
            - **Short, Punchy, No Fluff**: Get in, drop value, get out.
        
            ## **Tone & Style**
            - **Plain text only**—no fancy formatting, no emojis, no hashtags. Just straight facts.
            - **Write like you're debating a friend over coffee** (or roasting them, your call).
            - **Keep it savage but smart**—we’re here for hard truths, not empty words.
            ## **Rule**
            - "Provide a raw text summary with no formatting, no markdown, no special characters, and no escape sequences."
            Make the summary so **spicy, bold, and brutally honest** that the reader can't stop thinking about it.`
        ],        
        ["user", "Summarize this blog content: {content}"],
    ]);
    const stringParser = new StringOutputParser();
    const chain = summarizePrompt.pipe(model).pipe(stringParser);

    const response = await chain.invoke({ content: webContentText });

    return response
    .replace(/[*_`"\\]/g, '') 
    .replace(/\s+/g, ' ') 
    .trim();
};

const createTwitterPosts = async (summary) => {
    try {
      console.log(`Summary length :::: ${summary.length}`);
      
      const CHARACTER_LIMIT = 250;
      
      // Clean the summary text - remove newlines and other formatting
      const cleanSummary = summary.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
      
      // Handle short summary case
      if (cleanSummary.length <= CHARACTER_LIMIT) {
        return [{ tweet: cleanSummary }];
      }
      
      const tweets = [];
      const words = cleanSummary.split(' ');
      let currentTweet = '';
      let tweetCount = 1;
      
      // Calculate approximate number of tweets needed
      const estimatedTweetCount = Math.ceil(cleanSummary.length / CHARACTER_LIMIT);
      
      for (const word of words) {
        const spacer = currentTweet ? ' ' : '';
        
        const numberingSpace = 6; 
        
        const potentialTweet = currentTweet + spacer + word;
        if ((potentialTweet.length + numberingSpace > CHARACTER_LIMIT) && 
            (words.indexOf(word) !== words.length - 1)) {
          tweets.push({ 
            tweet: `${currentTweet.trim()} (${tweetCount}/${estimatedTweetCount})` 
          });
          tweetCount++;
          currentTweet = word;
        } else {
          currentTweet = potentialTweet;
        }
      }
      if (currentTweet) {
        tweets.push({ 
          tweet: `${currentTweet.trim()} (${tweetCount}/${estimatedTweetCount})` 
        });
      }
      
      return {
        threads: tweets,
        totalThreads: tweets.length
      };
    } catch (error) {
      console.error("Error in createTwitterPosts:", error.message);
      return { error: error.message };
    }
  };
const tweetGenerate = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    // 1. Load and scrape web content
    const docs = await loadWebContent(url);
    // 2. Summarize the blog content
    const summary = await summarizeBlogContent(docs);
    // 3. Split into Twitter posts 
    const tweetThread = await createTwitterPosts(summary);
    res.status(200).json({
      message: "Tweet thread generated successfully",
      tweetThread: tweetThread,
      tweetCount: tweetThread.length,
    });
  } catch (error) {
    console.error("Error generating Twitter thread:", error);
    res.status(500).json({ error: error.message });
  }
};

export { tweetGenerate };
