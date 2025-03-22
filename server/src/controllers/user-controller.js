import { prisma } from "../database/db.config.js";
import { clearCookies, createTokens, createUser, generateAccessToken, generateRefreshToken, hashRefreshToken, isPasswordValid, isValidToken, setCookies } from "../services/user-services.js";
import jwt from "jsonwebtoken"
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ message: "All are required" });
        }
        if (username.length < 3) {
            return res.status(400).json({ message: "Username must be at least 3 characters" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const isUserExists = await prisma.user.findUnique({ where: { email: email } });
        if (isUserExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await createUser(req.body);
        return res.status(200).json({ message: "Register successful", user });
    } catch (error) {
        console.log(`Error while registering user`);
        return res.status(500).json({ error: error.message });

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isUserFound = await prisma.user.findUnique({ where: { email } });
        if (!isUserFound) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPwMatch = await isPasswordValid(password, isUserFound.password);
        if (!isPwMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const { accessToken, refreshToken } = await createTokens(isUserFound);
        const hashedRefreshToken = await hashRefreshToken(refreshToken);
        // store refresh token in db
        await prisma.user.update({
            where: { id: isUserFound.id },
            data: { refreshToken: hashedRefreshToken },
        });

        const loggedInUser = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                username: true,
                email: true
            }
        });
        setCookies(res, accessToken, refreshToken);
        return res.status(200).json({ message: "Login successful", user: loggedInUser, accessToken: accessToken });
    } catch (error) {
        console.error("Error while logging in user:", error);
        return res.status(500).json({ error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }
        const userId = req.user.id;
        await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
        clearCookies(res);
        return res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        console.log(`Error while logging out user, ${error}`);
        return res.status(500).json({ error: error.message });
    }
}

const refreshAccessToken = async (req, res) => {
    try {
        // Retrieve refresh token from cookies or Authorization header
        const incomingRefreshToken = req.cookies.refreshToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!incomingRefreshToken) {
            return res.status(401).json({ message: "Refresh token not found" });
        }

        // Verify refresh token
        let verifyingUser;
        try {
            verifyingUser = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }

        // Fetch user from database
        const isUserExist = await prisma.user.findUnique({ where: { id: verifyingUser.id } });
        if (!isUserExist) {
            return res.status(401).json({ message: "Invalid Refresh Token" });
        }
        const isRefreshTokenValid = await isValidToken(incomingRefreshToken, isUserExist.refreshToken);
        
        if (!isRefreshTokenValid) {
            return res.status(401).json({ message: "Refresh token is expired or used" });
        }

        // Generate new access and refresh tokens
        const { accessToken, refreshToken } = await createTokens(isUserExist);

        // Hash and store new refresh token
        const hashedRefreshToken = await hashRefreshToken(refreshToken);
        await prisma.user.update({
            where: { id: isUserExist.id },
            data: { refreshToken: hashedRefreshToken },
        });

        console.log(`[SUCCESS] Refreshed access token for user: ${isUserExist.username}`);

        // Set new tokens in cookies and response
        setCookies(res, accessToken, refreshToken);
        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            accessToken: accessToken,
        });

    } catch (error) {
        console.error("[ERROR] Unexpected error while refreshing token:", error);

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Refresh token is invalid or expired"
            });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUser = async (req, res) => {
    try {
        const {id} = req.body;
        const userData = await prisma.user.findUnique({where:{id:id},select:{id:true,username:true,email:true}});
        return res.status(200).json({userData:userData});
    } catch (error) {
        console.log(`Error while fetching user data, ${error}`);
        return res.status(500).json({error:error.message});
    }
}
export { registerUser, loginUser, logoutUser, refreshAccessToken,getUser }