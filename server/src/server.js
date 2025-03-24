import dotenv from "dotenv";
import express from "express"
import cookieParser from "cookie-parser"
import { connectDB } from "./database/db.config.js";
import userRoutes from "./routes/user-routes.js";
import agentsRoutes from "./routes/agent-routes.js";
import logger from "./../logger.js";
import morgan from "morgan";
import cors from "cors";
dotenv.config()
const app = express()
const corsOptions = {
  origin: [process.env.FRONTEND_URL], 
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
connectDB().then(() => {
    app.listen(port, () => {
        logger.info(`Server running on http://localhost:${port}`)
    })
})