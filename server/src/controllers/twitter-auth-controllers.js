import { twitterClient } from "../utils/utils.js";
import { prisma } from "../database/db.config.js";
import logger from "../../logger.js";

// In twitterAuth function
const twitterAuth = async (req, res) => {
    try {
      // Make sure to include userId in session or cookie
      const userId = req.user.id;
      
      // Generate OAuth URL with specific scopes
      const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
        process.env.TWITTER_REDIRECT_URI,
        { scope: ["tweet.read", "tweet.write", "users.read", "offline.access"] }
      );
      
      // Store the code verifier and state in cookies
      res.cookie("codeVerifier", codeVerifier, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 5 // 5 minutes - short expiration
      });
      
      res.cookie("state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 5 // 5 minutes
      });
      
      res.cookie("userId", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 5 // 5 minutes
      });
      
      res.json({ url });
    } catch (error) {
      console.error("Error generating Twitter auth link:", error);
      res.status(500).json({ message: "Failed to initiate Twitter login" });
    }
  };
  
  // In twitterCallback function
  const twitterCallback = async (req, res) => {
    try {
      const { state, code } = req.query;
      const storedState = req.cookies.state;
      const codeVerifier = req.cookies.codeVerifier;
      const userId = parseInt(req.cookies.userId, 10);
        // const userId = req.cookies.userId;
      
      // Log received values for debugging
      // console.log("Received in callback:");
      // console.log("- State:", state);
      // console.log("- Stored State:", storedState);
      // console.log("- Code:", code);
      // console.log("- Code Verifier exists:", !!codeVerifier);
      // console.log("- User ID:", userId);
      // console.log("- Redirect URI:", process.env.TWITTER_REDIRECT_URI);
      
      if (!state || !code || state !== storedState) {
        return res.status(400).json({ error: "Invalid OAuth state" });
      }
      
      if (!userId) {
        return res.status(400).json({ error: "User ID not found" });
      }
      
      if (!codeVerifier) {
        return res.status(400).json({ error: "Code verifier not found" });
      }
      
      // Exchange the code for tokens
      const { client: loggedClient, accessToken, refreshToken } = 
        await twitterClient.loginWithOAuth2({
          code,
          codeVerifier,
          redirectUri: process.env.TWITTER_REDIRECT_URI,
        });
      
      // Verify we have the tokens
      if (!accessToken) {
        return res.status(400).json({ error: "Failed to obtain access token" });
      }
      
      // Get user details from Twitter
      const { data: twitterUser } = await loggedClient.v2.me();
      
      // Update user in database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          xAccessToken: accessToken,
          xRefreshToken: refreshToken,
          isTwitterLoggedIn: true,
        },
      });
      
      // Clear cookies
      res.clearCookie("state");
      res.clearCookie("codeVerifier");
      res.clearCookie("userId");
      
    //   res.json({
    //     message: "Twitter connected successfully",
    //     twitterUser,
    //     updatedUser,
    //   });
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard/auto-schedule?success=true`);

    } catch (error) {
      console.error("Twitter Callback Error:", error);
      console.error("Error details:", error.data?.error_description || error.message);
      
      // Clear cookies even on error
      res.clearCookie("state");
      res.clearCookie("codeVerifier");
      res.clearCookie("userId");
      
      res.status(500).json({ 
        message: "Twitter OAuth failed", 
        error: error.data?.error_description || error.message 
      });
    }
  };
  const twitterLogout = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({ where: { id: userId } });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Clear Twitter tokens from the database
      await prisma.user.update({
        where: { id: userId },
        data: {
          xAccessToken: null,
          xRefreshToken: null,
          isTwitterLoggedIn: false,
        },
      });
  
      res.clearCookie("state");
      res.clearCookie("codeVerifier");
      res.clearCookie("userId");
  
      res.json({ message: "Successfully logged out" });
    } catch (error) {
      logger.error("Error during Twitter logout:", error);
      res.status(500).json({ message: "Failed to log out" });
    }
  }
export {twitterAuth, twitterCallback, twitterLogout};