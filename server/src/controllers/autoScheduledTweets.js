import {TwitterApi} from "twitter-api-v2"
import cron from "node-cron";
// import { log } from "winston";
import logger from "../../logger.js";
// Twitter API Client
const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  });
  
  const scheduledTweets = [];

  const autoScheduleTweets = async (req, res) => {
    try {
      const { content, scheduleTime } = req.body; // scheduleTime = "YYYY-MM-DD HH:mm:ss"
  
      if (!content || !scheduleTime) {
        return res.status(400).json({ message: "Content and schedule time required" });
      }
  
      // Convert scheduleTime to Date object in UTC format
      const tweetTime = new Date(scheduleTime.replace(" ", "T") + "Z");
      const currentTime = new Date();
  
      logger.info("Tweet time:", tweetTime);
      logger.info("Current time:", currentTime);
      logger.info(`tweetTime <= currentTime : ${tweetTime <= currentTime}`);
      if (tweetTime <= currentTime) {
        try {
          await twitterClient.v2.tweet(content);
          return res.status(200).json({ message: "Tweet posted immediately", content });
        } catch (error) {
          logger.error("Error posting tweet:", error);
          return res.status(500).json({ message: "Failed to post tweet", error: error.message });
        }
      }
      logger.info("Scheduling tweet for:", tweetTime);
      // Schedule the tweet using cron
      cron.schedule(`${tweetTime.getUTCMinutes()} ${tweetTime.getUTCHours()} * * *`, async () => {
        logger.info("Cron job triggered at:", new Date());
        try {
          await twitterClient.v2.tweet(content);
          logger.info("Tweet posted successfully:");
        } catch (error) {
          logger.error("Error posting tweet in cron:", error);
        }
      });
  
      return res.json({ message: "Tweet scheduled successfully", scheduleTime });
  
    } catch (error) {
      logger.error("Server error:", error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

  export {autoScheduleTweets}