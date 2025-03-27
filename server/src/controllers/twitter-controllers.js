import { TwitterApi } from "twitter-api-v2";
import cron from "node-cron";
import logger from "../../logger.js";
import { prisma } from "../database/db.config.js";

// Twitter API Client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const futureScheduleTweet = async (content, scheduleTime, userId) => {
  try {
    // Convert `scheduleTime` to a Date object (UTC format)
    const tweetTime = new Date(scheduleTime.replace(" ", "T") + "Z");

    // Store tweet in the database as "pending"
    const scheduledTweet = await prisma.tweets.create({
      data: {
        content,
        scheduleTime: tweetTime, // Proper Date format
        status: "pending",
        userId,
      },
    });

    logger.info(`Tweet scheduled for: ${tweetTime}`);

    // Extract time details for cron format
    const minutes = tweetTime.getUTCMinutes();
    const hours = tweetTime.getUTCHours();
    const day = tweetTime.getUTCDate();
    const month = tweetTime.getUTCMonth() + 1; // Months in cron are 1-12

    // Schedule the tweet using cron
    const cronExpression = `${minutes} ${hours} ${day} ${month} *`;
    logger.info(`Cron job scheduled with expression: ${cronExpression}`);

    cron.schedule(cronExpression, async () => {
      logger.info("Cron job triggered for scheduled tweet")

      try {
        // Post the tweet
        const response = await twitterClient.v2.tweet(content);
        // Update tweet status in the database
        await prisma.tweets.update({
          where: { id: scheduledTweet.id },
          data: { status: "posted" },
        });

        logger.info(`Tweet posted successfully at ${new Date()}:`, response);
      } catch (error) {
        // Update status to "failed" if tweet fails
        await prisma.tweets.update({
          where: { id: scheduledTweet.id },
          data: { status: "failed" },
        });

        logger.error("Error posting tweet in cron:", error);
      }
    });

  } catch (error) {
    logger.error("Error scheduling tweet for future:", error);
  }
};


const pastImmediateTweet = async (content, scheduleTime, userId) => {
  try {
    await twitterClient.v2.tweet(content);
    const tweetTime = new Date(scheduleTime.replace(" ", "T") + "Z");
    // Store tweet in database as 'posted'
    await prisma.tweets.create({
      data: {
        content,
        scheduleTime: tweetTime,
        status: "posted",
        userId,
      },
    });

    logger.info("Tweet posted successfully immediately");
  } catch (error) {
    logger.error("Error posting tweet immediately:", error);
    throw new Error("Failed to post tweet.");
  }
};

const autoScheduleTweets = async (req, res) => {
  try {
    const { content, scheduleTime } = req.body;
    console.log(`Content: ${content}, Schedule Time: ${scheduleTime}`);
    
    const userId = req.user.id;

    if (!content || !scheduleTime) {
      return res.status(400).json({ message: "Content and schedule time required" });
    }

    // Convert scheduleTime to Date object (Local Time)
    const tweetTime = new Date(scheduleTime.replace(" ", "T")); 
    const currentTime = new Date();

    // Convert both to timestamps for accurate comparison
    const tweetTimeUTC = tweetTime.getTime();
    const currentTimeUTC = currentTime.getTime();

    console.log(`Current Time (UTC): ${currentTime}, Tweet Time (Local): ${tweetTime}`);
    console.log(`tweetTime <= currentTime: ${tweetTimeUTC <= currentTimeUTC}`);

    if (isNaN(tweetTimeUTC)) {
      return res.status(400).json({ message: "Invalid schedule time format" });
    }

    // If schedule time is past/present, post immediately
    if (tweetTimeUTC <= currentTimeUTC) {
      logger.info("Posting tweet immediately as schedule time is in the past or present");
      await pastImmediateTweet(content, scheduleTime, userId);
      return res.status(200).json({ message: "Tweet posted immediately", content });
    }

    // Schedule for future
    await futureScheduleTweet(content, scheduleTime, userId);
    return res.status(200).json({ message: "Tweet scheduled successfully", scheduleTime });

  } catch (error) {
    logger.error("Server error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { autoScheduleTweets };
