import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../database/db.config.js";

const isPasswordValid = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}
const generateToken = async (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    return token;
};

const createUser = async (userData) =>{
    try {
        const {email,password} = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            }
        })
        return user;
    } catch (error) {
        console.log(`Error creating user, ${error}`);
        return error;
    }
}
export { isPasswordValid, generateToken,createUser }
