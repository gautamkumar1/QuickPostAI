import rateLimit from "express-rate-limit";

// Login rate limiter (5 attempts per minute)
const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login attempts per window
    message: { error: "Too many login attempts, please try again in 15 minutes." },
    headers: true, 
    keyGenerator: (req) => req.ip, // Use IP address as key
    handler: (req, res, next) => {
        res.status(429).json({ error: "Too many login attempts, please try again later." });
    }
});

// Registration rate limiter (3 per hour, max 10 per day)
const registrationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Max 3 requests per hour
    message: { error: "Too many registration attempts, please try again later." },
    headers: true,
    keyGenerator: (req) => req.ip,
});

export { loginLimiter, registrationLimiter };