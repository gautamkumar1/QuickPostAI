import rateLimit from "express-rate-limit";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a log file path
const logFilePath = path.join(__dirname, 'request_logs.txt');
const personalEmail = process.env.PERSONAL_EMAIL;
// Function to log IP address
const logIP = (req, message) => {
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip} - ${message}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
};
// Rate limiter: Max 3 requests per day per IP
const generateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 3, // Limit each IP to 3 requests per day
    message: { error: "You have reached your daily request limit. Try again tomorrow." },
    headers: true, // Include rate limit info in response headers
    skip: (req, res) => {
        return req.user?.email === personalEmail;
    },    
    handler: (req, res, next) => {
        logIP(req, "Rate limit exceeded");
        res.status(429).json({ error: "You have reached your daily request limit. Try again tomorrow." });
    }
});
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

export { loginLimiter, registrationLimiter,generateLimiter };