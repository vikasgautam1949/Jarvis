import User from '../models/user.model.js';
import uploadCloudinary from "../config/cloudinary.js";
import geminiResponse from '../gemini.js';
import moment from 'moment';
// import bcrypt from "bcryptjs";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Error fetching current user: ${error}` });
  }
}


export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;
    if(req.file){
      assistantImage = await uploadCloudinary(req.file.path);
    }else{
      assistantImage = imageUrl;
    }
    const user= await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true}).select("-password")
    
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Error updating assistant: ${error}` });
  }
}

export const askToAssistant= async(req,res)=>{
  try {
    const {command} = req.body
    const user = await User.findById(req.userId);
    const userName = user.name
    const assistantName = user.assistantName
    const result = await geminiResponse(command,userName,assistantName)

    const jsonMatch=result.match(/{[\s\S]*}/)
    if(!jsonMatch){
      return res.status(400).json({response: "sorry, i can't understand"})
    }

    const gemResult= JSON.parse(jsonMatch[0])
    const type= gemResult.type
    switch(type){
      case 'get_date' :
        return res.status(200).json({
          type, 
          userInput: gemResult.userInput,
          response: `Today is ${moment().format('MMMM Do YYYY')}`
        });
      case 'get_time' :
        return res.status(200).json({
          type: "get_time", 
          userInput: command,
          response: `Current time is ${moment().format('h:mm A')}`
        });
      case 'get_day' :
        return res.status(200).json({
          type: "get_day", 
          userInput: command,
          response: `Today is ${moment().format('dddd')}`
        });
      case 'get_month' :
        return res.status(200).json({
          type: "get_month", 
          userInput: command,
          response: `Current month is ${moment().format('MMMM')}`
        });
        case 'google_search':
        case 'youtube_search':
        case 'youtube_play':  
        case 'calculator_open':
        case 'instagram_open':
        case 'facebook_open':
        case 'weather_show':
          case 'general':
            return res.status(200).json({
              type,
              userInput: gemResult.userInput,
              response: gemResult.response,
            });

            default:
              return res.status(400).json({ response: "Invalid type received from Gemini" });
    } 

  } catch (error) {
    return res.status(500).json({ message: `Error processing command: ${error}` });
  }
}