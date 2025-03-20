import jwt from "jsonwebtoken"
import { prisma } from "../database/db.config.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            console.error("JWT verification failed:", err);
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        const decodedUser = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, username: true, email: true }
        });
        if (!decodedUser) {
            return res.status(401).json({ message: "Invalid token or user not found" });
        }
        req.user = decodedUser;
        next();
    } catch (error) {
        console.error("Error while authenticating user:", error);
        return res.status(500).json({ error: error.message });
    }
};


export default isAuthenticated;