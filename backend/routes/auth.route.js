import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"
const authRouter = express.Router()


authRouter.post("/signup",signup)
authRouter.post("/signin",login)
authRouter.get("/logout",logout)


export default authRouter