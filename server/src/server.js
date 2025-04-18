import dotenv from "dotenv";
import express from "express"
import cookieParser from "cookie-parser"
import { connectDB } from "./database/db.config.js";
import userRoutes from "./routes/user-routes.js";
import agentsRoutes from "./routes/agent-routes.js";
import tweetsRoutes from "./routes/tweet-routes.js";
import logger from "./../logger.js";
import morgan from "morgan";
import cors from "cors";
import { reloadScheduledTweets } from "./controllers/twitter-controllers.js";
dotenv.config()
const app = express()
const FRONTEND_URL = process.env.NODE_ENV === "development" ? process.env.DEV_FRONTEND_URL : process.env.PROD_FRONTEND_URL
const corsOptions = {
  origin: [FRONTEND_URL], 
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type,Authorization", 
  credentials: true,
};
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(cors(corsOptions));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
const port = process.env.PORT
app.use("/api/v1",userRoutes)
app.use("/api/v1",agentsRoutes)
app.use("/api/v1",tweetsRoutes)
app.get("/", (_, res) => {
    res.send("Hello server is running")
})
app.get("/health", (_, res) => {
  res.status(200).send("OK");
});
connectDB().then(() => {
    app.listen(port, () => {
        logger.info(`Server running on http://localhost:${port}`)
        reloadScheduledTweets();
        logger.info("Reloading scheduled tweets")
    })
})