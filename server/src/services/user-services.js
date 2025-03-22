import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../database/db.config.js";

const isPasswordValid = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}
const generateAccessToken = async (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    return token;
};
const generateRefreshToken = async (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    return token;
};
const hashRefreshToken = async (refreshToken) =>{
    return await bcrypt.hash(refreshToken,10);
}
const isValidToken = async (refreshToken,hashedRefreshToken) =>{
    return await bcrypt.compare(refreshToken,hashedRefreshToken);
}
const createUser = async (userData) =>{
    try {
        const {email,password,username} = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            }
        })
        const newCreatedUser = await prisma.user.findUnique({where:{email:email},select:{id:true,username:true,email:true,refreshToken:true}});
        return newCreatedUser;
    } catch (error) {
        console.log(`Error creating user, ${error}`);
        return error;
    }
}
const createTokens = async (user) => {
    // Access token - short lived
    const accessToken = await generateAccessToken(user)
    
    // Refresh token - longer lived
    const refreshToken = await generateRefreshToken(user);
    
    return { accessToken, refreshToken };
  };



  const COOKIE_SECURE = process.env.NODE_ENV === 'production'
  const COOKIE_HTTPONLY = true
  const COOKIE_SAMESITE = process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
  const setCookies = (res, accessToken, refreshToken) => {
    /*
    /// ***** ALWAYS SET THE MAX AGE EQUAL TO TOKEN EXPIRY ***** ///
     */
    // Set access token cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: COOKIE_HTTPONLY, 
      secure: COOKIE_SECURE, 
      sameSite: COOKIE_SAMESITE, 
      maxAge: process.env.ACCESS_TOKEN_EXPIRY === '15m' ? 15 * 60 * 1000 : parseInt(process.env.ACCESS_TOKEN_EXPIRY) // Convert to milliseconds
    });
    
    // Set refresh token cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: COOKIE_HTTPONLY,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAMESITE,
      path: '/api/v1/auth/refreshToken', // Only sent to refresh token endpoint
      maxAge: process.env.REFRESH_TOKEN_EXPIRY === '7d' ? 7 * 24 * 60 * 60 * 1000 : parseInt(process.env.REFRESH_TOKEN_EXPIRY) // Convert to milliseconds
    });
  };
  const clearCookies = (res) => {
    res.cookie('accessToken', {
        httpOnly: COOKIE_HTTPONLY,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAMESITE,
        expires: new Date(0) // Expire immediately
    });

    res.cookie('refreshToken', {
        httpOnly: COOKIE_HTTPONLY,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAMESITE,
        path: '/api/v1/auth/refreshToken', // Same path as when setting the cookie
        expires: new Date(0) // Expire immediately
    });
};

export { isPasswordValid, generateAccessToken,generateRefreshToken,createUser,hashRefreshToken,isValidToken,createTokens,setCookies,clearCookies }
