import { Router } from "express";
import isAuthenticated from "../middleware/auth-middleware.js";
import { autoScheduleTweets, createXPost, getPosts, getScheduledTweets } from "../controllers/twitter-controllers.js";
import { twitterAuth, twitterCallback, twitterLogout } from "../controllers/twitter-auth-controllers.js";
import { generateLimiter } from "../controllers/rate-limit-controllers.js";
const router = Router();
router.post("/autoSchedule",isAuthenticated,autoScheduleTweets)
router.get("/auth/connect", isAuthenticated, twitterAuth);
router.get("/auth/twitter/callback", twitterCallback);
router.get("/getScheduledTweets",isAuthenticated,getScheduledTweets)
router.get("/auth/xlogout",isAuthenticated,twitterLogout);
router.post("/createxpost",isAuthenticated,generateLimiter,createXPost)
router.get("/getposts",isAuthenticated,getPosts)
export default router;