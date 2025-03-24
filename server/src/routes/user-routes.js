import {Router} from "express"
import { getUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user-controller.js";
import isAuthenticated from "../middleware/auth-middleware.js";
import { loginLimiter, registrationLimiter } from "../controllers/rate-limit-controllers.js";

const router = Router();
router.post("/auth/signup",registrationLimiter,registerUser)
router.post("/auth/signin",loginLimiter,loginUser)
router.post("/auth/logout",isAuthenticated,logoutUser)
router.post("/auth/refreshToken",refreshAccessToken)
router.post("/auth/user",isAuthenticated,getUser)
export default router