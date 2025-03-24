import {Router} from "express"
import { getUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user-controller.js";
import isAuthenticated from "../middleware/auth-middleware.js";
import { loginLimiter, registrationLimiter } from "../controllers/rate-limit-controllers.js";
import { prisma } from "../database/db.config.js";

const router = Router();
router.post("/auth/signup",registrationLimiter,registerUser)
router.post("/auth/signin",loginLimiter,loginUser)
router.post("/auth/logout",isAuthenticated,logoutUser)
router.post("/auth/refreshToken",refreshAccessToken)
router.post("/auth/user",isAuthenticated,getUser)
router.post("/updateData",async (req,res)=>{
    try {
        const {id,username} = req.body;
        const avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`
        await prisma.user.update({
            where:{
                id:id
            },
            data:{
                avatarUrl:avatar
            }
        })
        return res.status(200).json({message:"Avatar updated successfully"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:"Error updating avatar"})
    }
})
export default router