import {Router} from "express";
import { getTweetsDetails, tweetGenerate } from "../controllers/agent-controllers.js";
import { generateLimiter } from "../controllers/rate-limit-controllers.js";
import isAuthenticated from "../middleware/auth-middleware.js";
import { autoScheduleTweets } from "../controllers/autoScheduledTweets.js";

const router = Router();
router.post("/tweetGenerate",isAuthenticated,generateLimiter,tweetGenerate)
// test route
// router.post("/tweetGenerate",isAuthenticated,tweetGenerate)
router.get("/getTweetsDetails",isAuthenticated,getTweetsDetails)
router.post("/autoSchedule",isAuthenticated,autoScheduleTweets)
export default router