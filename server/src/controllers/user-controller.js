import { prisma } from "../database/db.config.js";
import { createUser, generateAccessToken, generateRefreshToken, isPasswordValid } from "../services/user-services.js";

const registerUser = async (req, res) => {
    try {
        const {username,email,password} = req.body;
        if(!email || !password || !username){
            return res.status(400).json({ message: "All are required"});
        }
        if(username.length < 3){
            return res.status(400).json({ message: "Username must be at least 3 characters"});
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const isUserExists = await prisma.user.findUnique({where:{email:email}});
        if(isUserExists){
            return res.status(400).json({ message: "User already exists"});
        }
        const user = await createUser(req.body);
        return res.status(201).json({ message: "User created successfully",user});
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

        const accessToken = await generateAccessToken(isUserFound);
        const refreshToken = await generateRefreshToken(isUserFound);

        // store refresh token in db
        await prisma.user.update({
            where: { email },
            data: { refreshToken: refreshToken },
        });

        const loggedInUser = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                username: true,
                email: true
            }
        });
// Always set the maxAge time equal to the refresh token expiry time bcz it will not forced user to login again before the expiry time of refresh token
        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "none"
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User logged in successfully",
                loggedInUser: loggedInUser,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
    } catch (error) {
        console.error("Error while logging in user:", error);
        return res.status(500).json({ error: error.message });
    }
};


export { registerUser,loginUser }