import { TwitterApi } from "twitter-api-v2";
import cron from "node-cron";
import logger from "../../logger.js";
import { prisma } from "../database/db.config.js";

// Twitter API Client
// const twitterClient = new TwitterApi({
//   appKey: process.env.TWITTER_API_KEY || "",
//   appSecret: process.env.TWITTER_API_SECRET || "",
//   accessToken: process.env.TWITTER_ACCESS_TOKEN || "",
//   accessSecret: process.env.TWITTER_ACCESS_SECRET || "",
// });

// const futureScheduleTweet = async (content, scheduleTime, user) => {
//   try {
//     // Convert `scheduleTime` to a Date object (UTC format)
//     const { xAccessToken, xRefreshToken } = user;
//     const userClient = new TwitterApi(user.xAccessToken);
//     const userId = user.id;
//     const tweetTime = new Date(scheduleTime);
//     console.log("Received scheduleTime:", scheduleTime);
// console.log("Converted tweetTime (raw):", tweetTime);
// const tweetTimeUTC = new Date(tweetTime.toISOString());
// console.log("Final tweetTime (UTC):", tweetTimeUTC);
//     // Store tweet in the database as "pending"
//     const scheduledTweet = await prisma.tweets.create({
//       data: {
//         content,
//         scheduleTime: scheduleTime, // Proper Date format
//         status: "pending",
//         userId,
//       },
//     });
    
//     logger.info(`Tweet scheduled for: ${scheduleTime}`);

//     // Extract time details for cron format
//     const minutes = tweetTime.getUTCMinutes();
//     const hours = tweetTime.getUTCHours();
//     const day = tweetTime.getUTCDate();
//     const month = tweetTime.getUTCMonth() + 1; // Months in cron are 1-12

//     // Schedule the tweet using cron
//     const cronExpression = `${minutes} ${hours} ${day} ${month} *`;
//     logger.info(`Cron job scheduled with expression: ${cronExpression}`);

//     cron.schedule(cronExpression, async () => {
//       logger.info("Cron job triggered for scheduled tweet")

//       try {
//         // Post the tweet
//         const response = await userClient.v2.tweet(content);
//         // Update tweet status in the database
//         await prisma.tweets.update({
//           where: { id: scheduledTweet.id },
//           data: { status: "posted" },
//         });

//         logger.info(`Tweet posted successfully at ${new Date()}:`, response);
//       } catch (error) {
//         // Update status to "failed" if tweet fails
//         await prisma.tweets.update({
//           where: { id: scheduledTweet.id },
//           data: { status: "failed" },
//         });

//         logger.error("Error posting tweet in cron:", error);
//       }
//     });

//   } catch (error) {
//     logger.error("Error scheduling tweet for future:", error);
//   }
// };

// const futureScheduleTweet = async (content, scheduleTime, user) => {
//   try {
//     const userClient = new TwitterApi(user.xAccessToken);
//     const userId = user.id;

//     // ✅ Ensure `scheduleTime` is always treated as UTC
//     const tweetTime = new Date(scheduleTime);
//     const tweetTimeUTC = new Date(tweetTime.toISOString()); // Explicitly in UTC

//     console.log("Received scheduleTime:", scheduleTime);
//     console.log("Converted tweetTime (raw):", tweetTime);
//     console.log("Final tweetTime (UTC):", tweetTimeUTC);

//     // 🚨 Check if tweetTime is in the future
//     const currentTimeUTC = new Date();
//     if (tweetTimeUTC <= currentTimeUTC) {
//       return console.log("🚨 Cannot schedule a tweet in the past!");
//     }

//     // ✅ Store the tweet in the database
//     const scheduledTweet = await prisma.tweets.create({
//       data: {
//         content,
//         scheduleTime: tweetTimeUTC, // Store as UTC in DB
//         status: "pending",
//         userId,
//       },
//     });

//     logger.info(`Tweet scheduled for: ${tweetTimeUTC}`);

//     // ✅ Extract time details for cron format (UTC)
//     const minutes = tweetTimeUTC.getUTCMinutes();
//     const hours = tweetTimeUTC.getUTCHours();
//     const day = tweetTimeUTC.getUTCDate();
//     const month = tweetTimeUTC.getUTCMonth() + 1; // Months in cron are 1-12

//     // ✅ Construct valid cron expression
//     const cronExpression = `${minutes} ${hours} ${day} ${month} *`;
//     logger.info(`Cron job scheduled with expression: ${cronExpression}`);

//     // ✅ Schedule cron job
//     cron.schedule(cronExpression, async () => {
//       logger.info("🚀 Cron job triggered for scheduled tweet");

//       try {
//         // 🔥 Post the tweet
//         const response = await userClient.v2.tweet(content);

//         // ✅ Update status in DB
//         await prisma.tweets.update({
//           where: { id: scheduledTweet.id },
//           data: { status: "posted" },
//         });

//         logger.info(`✅ Tweet posted successfully at ${new Date()}:`, response);
//       } catch (error) {
//         // ❌ If posting fails, update status to "failed"
//         await prisma.tweets.update({
//           where: { id: scheduledTweet.id },
//           data: { status: "failed" },
//         });

//         logger.error("❌ Error posting tweet in cron:", error);
//       }
//     });

//   } catch (error) {
//     logger.error("❌ Error scheduling tweet for future:", error);
//   }
// };


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

// const autoScheduleTweets = async (req, res) => {
//   try {
//     const { content, scheduleTime } = req.body;
//     logger.info("Received request to auto-schedule tweet:", JSON.stringify(req.body));
//     if (!content || !scheduleTime) {
//       return res.status(400).json({ message: "Content and schedule time required" });
//     }
//     console.log(`Content: ${content}, Schedule Time: ${scheduleTime}`);
//     const userId = req.user.id; 
//     const user = await prisma.user.findUnique({ where: { id: req.user.id } });
//     if (!user || !user.xAccessToken) {
//       return res.status(400).json({ message: "Twitter not connected" });
//     }
    

//     // Convert scheduleTime to Date object (Local Time)
//     const tweetTime = new Date(scheduleTime.replace(" ", "T")); 
//     const currentTime = new Date();

//     // Convert both to timestamps for accurate comparison
//     const tweetTimeUTC = tweetTime.getTime();
//     const currentTimeUTC = currentTime.getTime();

//     // console.log(`Current Time (UTC): ${currentTime}, Tweet Time (Local): ${tweetTime}`);
//     // console.log(`tweetTime <= currentTime: ${tweetTimeUTC <= currentTimeUTC}`);

//     if (isNaN(tweetTimeUTC)) {
//       return res.status(400).json({ message: "Invalid schedule time format" });
//     }

//     // If schedule time is past/present, post immediately
//     if (tweetTimeUTC <= currentTimeUTC) {
//       return res.status(200).json({ message: "Must be scheduled for future" });
//     }

//     // Schedule for future
//     await futureScheduleTweet(content, scheduleTime,user);
//     return res.status(200).json({ message: "Tweet scheduled successfully", scheduleTime });

//   } catch (error) {
//     logger.error("Server error:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
const scheduledJobs = new Map();
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



const autoScheduleTweets = async (req, res) => {
  try {
    const { content, scheduleTime } = req.body;
    logger.info("Received request to auto-schedule tweet:", JSON.stringify(req.body));
    if (!content || !scheduleTime) {
      return res.status(400).json({ message: "Content and schedule time required" });
    }
    console.log(`Content: ${content}, Schedule Time: ${scheduleTime}`);
    
    const userId = req.user.id; 
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || !user.xAccessToken) {
      return res.status(400).json({ message: "Twitter not connected" });
    }
    
    // Convert scheduleTime to Date object
    const tweetTime = new Date(scheduleTime.replace(" ", "T")); 
    const currentTime = new Date();

    // Convert both to timestamps for accurate comparison
    const tweetTimeUTC = tweetTime.getTime();
    const currentTimeUTC = currentTime.getTime();

    if (isNaN(tweetTimeUTC)) {
      return res.status(400).json({ message: "Invalid schedule time format" });
    }

    // If schedule time is past/present, post immediately
    if (tweetTimeUTC <= currentTimeUTC) {
      return res.status(200).json({ message: "Must be scheduled for future" });
    }

    // Schedule for future
    const jobId = await futureScheduleTweet(content, scheduleTime, user);
    return res.status(200).json({ message: "Tweet scheduled successfully", scheduleTime, jobId });

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
    const tweetTime = new Date(scheduleTime.replace(" ", "T"));
    const tweetTimeUTC = new Date(tweetTime.toISOString());

    console.log("Received scheduleTime:", scheduleTime);
    console.log("Converted tweetTime (raw):", tweetTime);
    console.log("Final tweetTime (UTC):", tweetTimeUTC);

    // Check if tweetTime is in the future
    const currentTimeUTC = new Date();
    if (tweetTimeUTC <= currentTimeUTC) {
      return console.log("Cannot schedule a tweet in the past!");
    }

    // Store the tweet in the database
    const scheduledTweet = await prisma.tweets.create({
      data: {
        content,
        scheduleTime: tweetTimeUTC,
        status: "pending",
        userId,
      },
    });

    logger.info(`Tweet scheduled for: ${tweetTimeUTC}`);

    // Extract time details for cron format (UTC)
    const minutes = tweetTimeUTC.getUTCMinutes();
    const hours = tweetTimeUTC.getUTCHours();
    const day = tweetTimeUTC.getUTCDate();
    const month = tweetTimeUTC.getUTCMonth() + 1; // Months in cron are 1-12

    // Construct valid cron expression
    const cronExpression = `${minutes} ${hours} ${day} ${month} *`;
    logger.info(`Cron job scheduled with expression: ${cronExpression}`);

    // Generate a unique job ID
    const jobId = `tweet-${scheduledTweet.id}`;

    // Cancel any existing job with the same ID
    if (scheduledJobs.has(jobId)) {
      scheduledJobs.get(jobId).stop();
      scheduledJobs.delete(jobId);
      logger.info(`Cancelled existing job: ${jobId}`);
    }

    // Schedule cron job with immediate trigger option
    const job = cron.schedule(cronExpression, async () => {
      logger.info(`🚀 Cron job triggered for scheduled tweet: ${jobId}`);

      try {
        // Post the tweet
        const response = await userClient.v2.tweet(content);

        // Update status in DB
        await prisma.tweets.update({
          where: { id: scheduledTweet.id },
          data: { status: "posted" },
        });

        logger.info(`✅ Tweet posted successfully at ${new Date()}:`, response);
        
        // Clean up the job after execution
        if (scheduledJobs.has(jobId)) {
          scheduledJobs.get(jobId).stop();
          scheduledJobs.delete(jobId);
          logger.info(`Job ${jobId} completed and removed`);
        }
      } catch (error) {
        // If posting fails, update status to "failed"
        await prisma.tweets.update({
          where: { id: scheduledTweet.id },
          data: { status: "failed" },
        });

        logger.error(`❌ Error posting tweet in cron (${jobId}):`, error);
        
        // Clean up the job after failure
        if (scheduledJobs.has(jobId)) {
          scheduledJobs.get(jobId).stop();
          scheduledJobs.delete(jobId);
          logger.info(`Job ${jobId} failed and removed`);
        }
      }
    }, {
      scheduled: true,
      timezone: "UTC"  // Explicitly set timezone to UTC
    });

    // Start the job and store it in the map
    job.start();
    scheduledJobs.set(jobId, job);
    logger.info(`Job ${jobId} created and started`);

    return jobId;
  } catch (error) {
    logger.error("❌ Error scheduling tweet for future:", error);
    return null;
  }
};

// Add this to your startup code to restore scheduled tweets when the server restarts
const restoreScheduledTweets = async () => {
  try {
    // Get all pending tweets
    const pendingTweets = await prisma.tweets.findMany({
      where: {
        status: "pending",
        scheduleTime: {
          gt: new Date() // Only future tweets
        }
      },
      include: {
        user: true // Include user data to get access tokens
      }
    });

    logger.info(`Restoring ${pendingTweets.length} scheduled tweets`);

    // Reschedule each pending tweet
    for (const tweet of pendingTweets) {
      const scheduleTime = tweet.scheduleTime.toISOString();
      await futureScheduleTweet(tweet.content, scheduleTime, tweet.user);
    }

    logger.info("Scheduled tweets restored successfully");
  } catch (error) {
    logger.error("Error restoring scheduled tweets:", error);
  }
};

// Call this function when your server starts
// restoreScheduledTweets();

// Add this function to cleanly shut down cron jobs
const shutdownScheduledJobs = () => {
  for (const [jobId, job] of scheduledJobs.entries()) {
    job.stop();
    logger.info(`Stopped job: ${jobId}`);
  }
  scheduledJobs.clear();
  logger.info("All scheduled jobs stopped");
};


export { autoScheduleTweets,getScheduledTweets,shutdownScheduledJobs,restoreScheduledTweets};
