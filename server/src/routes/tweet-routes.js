import { Router } from "express";
import isAuthenticated from "../middleware/auth-middleware.js";
import { autoScheduleTweets, getScheduledTweets } from "../controllers/twitter-controllers.js";
import { twitterAuth, twitterCallback } from "../controllers/twitter-auth-controllers.js";
const router = Router();
router.post("/autoSchedule",isAuthenticated,autoScheduleTweets)
router.get("/auth/connect", isAuthenticated, twitterAuth);
router.get("/auth/twitter/callback", twitterCallback);
router.get("/getScheduledTweets",isAuthenticated,getScheduledTweets)
export default router;