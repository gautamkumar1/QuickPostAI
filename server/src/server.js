import dotenv from "dotenv";
import express from "express"
import { connectDB } from "./database/db.config.js";
dotenv.config()
const app = express()
app.use(express.json())
const port = process.env.PORT

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
})