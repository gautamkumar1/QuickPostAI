import {Router} from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user-controller.js";
import isAuthenticated from "../middleware/auth-middleware.js";

const router = Router();
router.post("/signup",registerUser)
router.post("/signin",loginUser)
router.post("/logout",isAuthenticated,logoutUser)
export default router