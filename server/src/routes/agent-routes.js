import {Router} from "express";
import { tweetGenerate } from "../controllers/agent-controllers.js";
import { generateLimiter } from "../controllers/rate-limit-controllers.js";
import isAuthenticated from "../middleware/auth-middleware.js";

const router = Router();
router.post("/tweetGenerate",isAuthenticated,generateLimiter,tweetGenerate)
export default router