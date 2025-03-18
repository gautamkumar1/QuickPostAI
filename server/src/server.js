import dotenv from "dotenv";
import express from "express"
import { connectDB } from "./database/db.config.js";
import userRoutes from "./routes/user-routes.js";
import agentsRoutes from "./routes/agent-routes.js";
dotenv.config()
const app = express()
app.use(express.json())
const port = process.env.PORT
app.use("/api/v1",userRoutes)
app.use("/api/v1",agentsRoutes)
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
})