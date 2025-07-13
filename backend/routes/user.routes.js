import express from "express"
import { getCurrentUser,updateAssistant,askToAssistant } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js"; // Assuming you have a middleware for handling file uploads
const userRouter = express.Router()

userRouter.get("/current",isAuth, getCurrentUser)
userRouter.post("/update", isAuth, upload.single("assistantImage"), updateAssistant)
userRouter.post("/asktoassistant", isAuth, askToAssistant) // Uncomment if you have an askToAssistant function


export default userRouter
