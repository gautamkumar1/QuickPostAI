import { TwitterApi } from "twitter-api-v2";
import { twitterClient } from "../utils/utils.js";
import { prisma } from "../database/db.config.js";
const twitterAuth = async (req, res) => {
    try {
        const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
          process.env.TWITTER_REDIRECT_URI,
          { scope: ["tweet.read", "tweet.write", "offline.access"] }
        );
    
        // Store values in session or cookies
        res.cookie("codeVerifier", codeVerifier, { httpOnly: true });
        res.cookie("state", state, { httpOnly: true });
    
        res.redirect(url);
      } catch (error) {
        console.error("Error connecting to Twitter:", error);
        res.status(500).json({ message: "Failed to initiate Twitter login" });
      }
}

const twitterCallback = async (req, res) => {
    const { state, code } = req.query;
  const storedState = req.cookies.state;
  const codeVerifier = req.cookies.codeVerifier;

  if (!state || !code || state !== storedState) {
    return res.status(400).json({ error: "Invalid OAuth state" });
  }

  try {
    // Exchange code for access & refresh tokens
    const { client: loggedClient, accessToken, refreshToken } =
      await twitterClient.loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: process.env.TWITTER_REDIRECT_URI,
      });

    // Get user details from Twitter
    const { data: twitterUser } = await loggedClient.v2.me();
    if (!twitterUser) {
      return res.status(400).json({ message: "Failed to fetch Twitter user" });
    }
    // Update User model with Twitter tokens
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        xAccessToken: accessToken,
        xRefreshToken: refreshToken,
      },
    });

    res.json({
      message: "Twitter connected successfully",
      twitterUser,
      updatedUser,
    });
  } catch (error) {
    console.error("Twitter Callback Error:", error);
    res.status(500).json({ message: "Twitter OAuth failed" });
  }
}

export {twitterAuth, twitterCallback};