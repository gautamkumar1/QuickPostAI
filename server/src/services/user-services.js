import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const isPasswordValid = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}
const generateToken = async (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            fullName: user.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    return token;
};

const createUser = async (userData) =>{
    try {
        
    } catch (error) {
        
    }
}
export { isPasswordValid, generateToken }
