import {Router} from "express"
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user-controller.js";
import isAuthenticated from "../middleware/auth-middleware.js";

const router = Router();
router.post("/auth/signup",registerUser)
router.post("/auth/signin",loginUser)
router.post("/auth/logout",isAuthenticated,logoutUser)
router.post("/auth/refreshToken",refreshAccessToken)
export default router