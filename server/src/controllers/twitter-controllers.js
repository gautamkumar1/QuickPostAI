import { TwitterApi } from "twitter-api-v2";
import cron from "node-cron";
import logger from "../../logger.js";
import { prisma } from "../database/db.config.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers"
import { model } from "./agent-controllers.js";
// Twitter API Client
// const twitterClient = new TwitterApi({
//   appKey: process.env.TWITTER_API_KEY || "",
//   appSecret: process.env.TWITTER_API_SECRET || "",
//   accessToken: process.env.TWITTER_ACCESS_TOKEN || "",
//   accessSecret: process.env.TWITTER_ACCESS_SECRET || "",
// });

// Store active cron jobs (in-memory for this example; consider a persistent store for production)
const scheduledJobs = new Map();

const autoScheduleTweets = async (req, res) => {
  try {
    const { content, scheduleTime } = req.body;
    logger.info("Received request to auto-schedule tweet:", JSON.stringify(req.body));
    if (!content || !scheduleTime) {
      return res.status(400).json({ message: "Content and schedule time required" });
    }
    console.log(`Content: ${content}, Schedule Time: ${scheduleTime}`);
    const userId = req.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.xAccessToken) {
      return res.status(400).json({ message: "Twitter not connected" });
    }

    const tweetTime = new Date(scheduleTime.replace(" ", "T")); // Local time to Date object
    const currentTime = new Date();

    const tweetTimeUTC = tweetTime.getTime();
    const currentTimeUTC = currentTime.getTime();

    if (isNaN(tweetTimeUTC)) {
      return res.status(400).json({ message: "Invalid schedule time format" });
    }

    if (tweetTimeUTC <= currentTimeUTC) {
      return res.status(200).json({ message: "Must be scheduled for future" });
    }

    await futureScheduleTweet(content, scheduleTime, user);
    return res.status(200).json({ message: "Tweet scheduled successfully", scheduleTime });
  } catch (error) {
    logger.error("Server error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const futureScheduleTweet = async (content, scheduleTime, user) => {
  try {
    const userClient = new TwitterApi(user.xAccessToken);
    const userId = user.id;

    // Ensure scheduleTime is treated as UTC
    // Assuming input is in a parseable format
    // const tweetTimeUTC = new Date(scheduleTime);
    let tweetTimeUTC = new Date(scheduleTime);
tweetTimeUTC.setUTCHours(tweetTimeUTC.getUTCHours()); // Ensure it's treated as UTC

    if (isNaN(tweetTimeUTC.getTime())) {
      throw new Error("Invalid scheduleTime format");
    }

    console.log("Received scheduleTime:", scheduleTime);
    console.log("Final tweetTime (UTC):", tweetTimeUTC.toISOString());

    const currentTimeUTC = new Date();
    if (tweetTimeUTC <= currentTimeUTC) {
      logger.warn("Cannot schedule a tweet in the past!");
      return;
    }

    // Store the tweet in the database
    const scheduledTweet = await prisma.tweets.create({
      data: {
        content,
        scheduleTime: tweetTimeUTC, // Store as UTC in DB
        status: "pending",
        userId,
      },
    });

    logger.info(`Tweet scheduled for: ${tweetTimeUTC}`);

    // Extract time details for cron (UTC)
    const minutes = tweetTimeUTC.getUTCMinutes();
    const hours = tweetTimeUTC.getUTCHours();
    const day = tweetTimeUTC.getUTCDate();
    const month = tweetTimeUTC.getUTCMonth() + 1; // Months in cron are 1-12
    const year = tweetTimeUTC.getUTCFullYear();

    // Construct cron expression with seconds precision for exact timing
    const cronExpression = `${0} ${minutes} ${hours} ${day} ${month} *`; // Runs at 0 seconds of the minute
    logger.info(`Cron job scheduled with expression: ${cronExpression} for year ${year}`);

    // Schedule cron job with UTC option
    const job = cron.schedule(
      cronExpression,
      async () => {
        logger.info(`Cron job triggered for tweet ID: ${scheduledTweet.id}`);
        try {
          const response = await userClient.v2.tweet(content);
          await prisma.tweets.update({
            where: { id: scheduledTweet.id },
            data: { status: "posted" },
          });
          logger.info(`Tweet posted successfully at ${new Date()}:`, response);
          scheduledJobs.delete(scheduledTweet.id); // Clean up
        } catch (error) {
          await prisma.tweets.update({
            where: { id: scheduledTweet.id },
            data: { status: "failed" },
          });
          logger.error("Error posting tweet in cron:", error);
          scheduledJobs.delete(scheduledTweet.id);
        }
      },
      {
        scheduled: true,
        timezone: "UTC", // Explicitly use UTC
      }
    );

    // Store the job reference
    scheduledJobs.set(scheduledTweet.id, job);

  } catch (error) {
    logger.error("Error scheduling tweet for future:", error);
    throw error;
  }
};

// Reload pending tweets on server start
const reloadScheduledTweets = async () => {
  const pendingTweets = await prisma.tweets.findMany({
    where: { status: "pending" },
  });

  for (const tweet of pendingTweets) {
    const user = await prisma.user.findUnique({ where: { id: tweet.userId } });
    if (user && user.xAccessToken) {
      await futureScheduleTweet(tweet.content, tweet.scheduleTime, user);
    }
  }
};
const getScheduledTweets = async (req, res) => {
  try {
    const userId = req.user.id;
    const scheduledTweets = await prisma.tweets.findMany({
      where: { userId },select:{id:true,content:true,scheduleTime:true,status:true,createdAt:true},
      orderBy: { scheduleTime: "asc" },
    });
    return res.status(200).json(scheduledTweets);
  } catch (error) {
    logger.error("Error fetching scheduled tweets:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const SYSTEM_PROMPT = 
`
You are an expert content creator for X (Twitter).
Your job is to generate an engaging, concise, and attention-grabbing X post (within 280 characters) based on the user's input.

Tone: [Select: Funny | Professional | Informative | Motivational | Savage]
Topic: [User-provided topic]
Optional Keywords/Hashtags: [User-provided]

Requirements:

Make sure the post is catchy, fits within 280 characters, and stands out in the X feed.

Avoid generic content. Add personality or wit depending on the tone.

You can use emojis if the tone is casual or funny.

Example Input:
Topic: "Productivity Hacks for Remote Work"
Tone: Motivational
Hashtags: #RemoteWork #Productivity

Expected Output:
"Working from home? 🏡 Stay productive with the 3:2 rule — 3 big tasks, 2 breaks. Keep it simple, stay focused. 💪 #RemoteWork #Productivity"
`
const xAgentAI = async (userPrompt) => {
  try {
    

    // Create the prompt template
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_PROMPT],
      ["user", "{input}"],
    ]);

    const stringParser = new StringOutputParser();
    const chain = prompt.pipe(model).pipe(stringParser);

    // Invoke chain with formatted input
    const response = await chain.invoke({ input: userPrompt });
    return response
    .replace(/[*_`"\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  } catch (error) {
    logger.error("Error in xAgentAI:", error);
    throw error;
  }
};

// Create X Post
const createXPost = async (req, res) => {
  try {
    const { topic, tone, hashtags } = req.body;

    if (!topic || !tone) {
      return res.status(400).json({ message: "Topic and Tone are required." });
    }

    // Format user prompt as expected by SYSTEM_PROMPT
    const userPrompt = `Topic: ${topic}\nTone: ${tone}\nHashtags: ${hashtags || ""}`;

    const aiResponse = await xAgentAI(userPrompt);

    return res.status(200).json({
      message: "AI response generated successfully",
      aiResponse,
    });
  } catch (error) {
    logger.error("Error generating AI response:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { autoScheduleTweets,getScheduledTweets,reloadScheduledTweets,createXPost};
