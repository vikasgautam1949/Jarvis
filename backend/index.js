import express from "express"
import dotenv from "dotenv";
  dotenv.config()
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import geminiResponse from "./gemini.js";
// import { started } from "prompt";

const app= express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}))
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.get("/", async (req, res) => {
  try {
    let prompt = req.query.prompt
    console.log("Received prompt:", prompt);

    const data = await geminiResponse(prompt);
    res.json(data);
  } catch (error) {
    console.error("Error in / route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/test",(req,res)=>{
  res.send("hello world")
})



app.listen(port,()=>{
  connectDb()
  console.log("server started");
})