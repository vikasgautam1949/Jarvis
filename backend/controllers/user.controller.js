import User from '../models/user.model.js';
import uploadCloudinary from "../config/cloudinary.js";
import geminiResponse from '../gemini.js';
import moment from 'moment';
import { response } from 'express';


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


export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    const userName = user.name;
    const assistantName = user.assistantName;

    const result = await geminiResponse(command, assistantName, userName);
    const jsonMatch = result.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      return res.status(400).json({ response: "Sorry, I can't understand." });
    }

    const gemResult = JSON.parse(jsonMatch[0]);
    console.log(gemResult);
    const { type, userInput, response } = gemResult;
    // const type = gemResult.type;


    switch (type) {
      case 'get_date':
        return res.status(200).json({
          type,
          userInput,
          response: `Current date is ${moment().format('YYYY-MM-DD')}`
        });

      case 'get_time':
        return res.status(200).json({
          type,
          userInput,
          response: `Current time is ${moment().format('hh:mm A')}`
        });

      case 'get_day':
        return res.status(200).json({
          type,
          userInput,
          response: `Today is ${moment().format('dddd')}`
        });

      case 'get_month':
        return res.status(200).json({
          type,
          userInput,
          response: `Current month is ${moment().format('MMMM')}`
        });

      case 'get_year':
        return res.status(200).json({
          type,
          userInput,
          response: `Current year is ${moment().format('YYYY')}`
        });

      // Assistant commands (search, open websites, general, etc.)
      case 'general':
      case 'google_search':
      case 'youtube_search':
      case 'youtube_play':
      case 'wikipedia_search':
      case 'news_show':
      case 'weather_show':
      case 'calculator_open':
      case 'instagram_open':
      case 'facebook_open':
      case 'whatsapp_open':
      case 'gmail_open':
      case 'maps_open':
      case 'linkedin_open':
      case 'camera_open':
      case 'google_open':
      case 'youtube_open':
      case 'play_music':
      case 'open_settings':
        return res.status(200).json({
          type,
          userInput,
          response,
        });

      default:
        return res.status(400).json({
          type: 'invalid_type',
          userInput,
          response: "I don't understand that command.",
        });
    }

  } catch (error) {
    console.error("askToAssistant error:", error.message);
    return res.status(500).json({ message: "ask assistant error" });
  }
}
