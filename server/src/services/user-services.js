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
        const {email,password,username} = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                username: username
            }
        })
        return user;
    } catch (error) {
        console.log(`Error creating user`);
        return error;
    }
}
export { isPasswordValid, generateToken,createUser }
