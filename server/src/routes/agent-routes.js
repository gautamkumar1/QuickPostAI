import {Router} from "express";
import { tweetGenerate } from "../controllers/agent-controllers.js";

const router = Router();
router.post("/tweetGenerate",tweetGenerate)
export default router