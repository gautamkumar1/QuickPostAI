import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers"
import { prisma } from "../database/db.config.js";
import logger from "../../logger.js";
import {replyPrompt}  from "../utils/prompt.js";
export const model = new ChatGoogleGenerativeAI({
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
    
      `
        You're not just summarizing a blog—you’re slicing through the nonsense and serving up only the juiciest insights. No fluff, no filler—just raw, unfiltered value.
    
        ## **Your Mission (If You Can Handle It)**
        - **Start Strong**: Hit the reader with a bold question or a reality check. No boring intros.
        - **Break It Down Like They’re Five**: If you need a PhD to understand it, you failed.
        - **Call Out the BS**: If something is overhyped, say it. If it's underrated, expose it.
        - **Inject Some Personality**: No robotic summaries—**sass, wit, and attitude are welcome**.
        - **Make Them Think**: Drop a hot take that challenges conventional wisdom.
        - **Short, Punchy, No Fluff**: Get in, drop value, get out.
    
        ## **Tone & Style**
        - **Plain text only**—no fancy formatting, no markdown, no emojis, no hashtags. Just straight facts.
        - **Write like you're debating a friend over coffee** (or roasting them, your call).
        - **Keep it savage but smart**—we’re here for hard truths, not empty words.
    
        ## **The Summary Rule**
        - **Deliver a raw, no-BS summary** that condenses the original text into an easy-to-understand format.
        - **Cover all key points, main ideas, and supporting details**—but strip out anything unnecessary or repetitive.
        - **No formatting, no markdown, no escape sequences—just pure text.**
        - **Length should match the complexity of the original text**—concise but complete.
        - **If an example helps, include it. If it doesn’t, cut it.**
        Make the summary **so spicy, bold, and brutally honest** that the reader can't stop thinking about it.
      `
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
      logger.info(`Summary length :::: ${summary.length}`);
      
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
    logger.info(`userId :::: ${req.user.id}`);
    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    logger.info(`UserIP :::: ${userIP}`);
    
    await prisma.posts.create({
      data:{
        userId: req.user.id,
        postUrl:url,
        tweets: tweetThread.threads,
      }
    })
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
const getTweetsDetails = async (req, res) => {
  try {
    logger.info(`User Id :::: ${req.user.id}`);
    const id = req.user.id;
    if(!id){
      return res.status(400).json({message:"User Id is required"});
    }
    const posts = await prisma.posts.findMany({
      where: {
        userId: id,
      },
    });
    res.status(200).json({ posts });
  } catch (error) {
    logger.error("Error getting tweets:", error);
    res.status(500).json({ error: error.message });
  }
}

/*
*** EngageLab - CONTROLLERS ***
*/

const replyController = async (req, res) => {
  try {
    const { tweet } = req.body;
    if (!tweet) {
      return res.status(400).json({ message: "Tweet is required" });
    }
    const responseReply = ChatPromptTemplate.fromMessages([
      [
        "system",
        `
        ${replyPrompt}
        `
      ],
      ["user", "Reply to this tweet: {tweet}"],
    ]);
    const stringParser = new StringOutputParser();
    const chain= responseReply.pipe(model).pipe(stringParser);
    const response = await chain.invoke({ tweet })
    // logger.info(`Response :::: ${response}`);
    const cleanedResponse = String(response)
  .replace(/[*_`"\\]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

res.status(200).json({ reply: cleanedResponse });

  } catch (error) {
    logger.error("Error generating reply:", error);
    res.status(500).json({ error: error.message });
  }
}
export { tweetGenerate,getTweetsDetails,replyController };
