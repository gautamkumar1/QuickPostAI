import { Router } from "express";
import isAuthenticated from "../middleware/auth-middleware.js";
import { autoScheduleTweets } from "../controllers/twitter-controllers.js";
import { twitterAuth, twitterCallback } from "../controllers/twitter-auth-controllers.js";
const router = Router();
router.post("/autoSchedule",isAuthenticated,autoScheduleTweets)
export default router;

// Twitter OAuth
router.get("/auth/connect", isAuthenticated, twitterAuth);
// router.get("/auth/callback", isAuthenticated, twitterCallback);
router.get("/auth/twitter/callback", twitterCallback);