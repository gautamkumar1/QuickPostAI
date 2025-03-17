import { prisma } from "../database/db.config.js";
import { createUser, generateToken, isPasswordValid } from "../services/user-services.js";

const registerUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        const isUserExists = await prisma.user.findUnique({where:{email:user.email}});
        if(!isUserExists){
            return res.status(400).json({ message: "User already exists"});
        }
        return res.status(201).json({ message: "User created successfully",user});
    } catch (error) {
        console.log(`Error while registering user`);
        return res.status(500).json({ error: error.message });
        
    }
}

const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "All are required"});
        }
        const isUserFound = await prisma.user.findUnique({where:{email:email}});
        if(!isUserFound){
            return res.status(400).json({ message: "User not found"});
        }
        const isPwMatch = await isPasswordValid(password,isUserFound.password);
        if(!isPwMatch){
            return res.status(400).json({ message: "Password is incorrect"});
        }
        const token = await generateToken(isUserFound);
        return res.status(200).json({ message: "User logged in successfully",token});
    } catch (error) {
        console.log(`Error while logging in user`,error);
        return res.status(500).json({ error: error.message });
        
    }
}

export { registerUser,loginUser }