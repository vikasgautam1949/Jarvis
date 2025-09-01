import User from '../models/user.model.js';
import uploadCloudinary from "../config/cloudinary.js";
import geminiResponse from '../gemini.js';
import moment from 'moment';
import { response } from 'express';
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
    const type = gemResult.type;

    switch(type){
      case 'get_date': 
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response:`current date is ${moment().format('YYYY-MM-DD')}`
        });
        case 'get_time': 
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response:`current time is ${moment().format('hh:mm A')}`
        });
        case 'get_day': 
        if(type === 'get_day'){
      speak(`Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`);
    }
        case 'get_month': 
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response:`current  month is ${moment().format('MMMM')}`
        });
         case 'get_year': 
        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response:`current  year is ${moment().format('YYYY')}`
        });

  case 'general':
    // for factual questions or chit-chat

  case 'google_search':
    // if user wants to search something on Google
        if(type === 'google_search'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`,'_blank');
    }
  case 'youtube_search':
    // if user wants to search on YouTube
     if(type === 'youtube_search' || type === 'youtube_play'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`,'_blank');
    }

  case 'youtube_play':
    // if user wants to play a video or song

  case 'wikipedia_search':
    // if user asks about a person, place, or topic
    if(type === 'wikipedia_search'){
      const query = encodeURIComponent(userInput);
      window.open(`https://en.wikipedia.org/wiki/${query}`,'_blank');
    }
  case 'news_show':
    // if user asks for the latest news or headlines
    if(type === 'news_show'){
      window.open(`https://news.google.com`,'_blank');
    }
  case 'weather_show':
    // if user asks for the current weather
     if(type === 'weather_show'){
      window.open('https://www.weather.com/','_blank');
    }
  case 'calculator_open':
    // if user asks to open a calculator
    if(type === 'calculator_open'){
      window.open('https://www.calculator.net/','_blank');
    }
  case 'instagram_open':
    // if user wants to open Instagram
    if(type === 'instagram_open'){
      window.open('https://www.instagram.com/','_blank');
    }
  case 'facebook_open':
    // if user wants to open Facebook
    if(type === 'facebook_open'){
      window.open('https://www.facebook.com/','_blank');
    }
  case 'whatsapp_open':
    // if user asks to open WhatsApp Web
    if(type === 'whatsapp_open'){
      window.open('https://web.whatsapp.com/','_blank');
    }
  case 'gmail_open':
    // if user asks to open Gmail
    if(type === 'gmail_open'){
      window.open('https://mail.google.com/','_blank');
    }
  case 'maps_open':
    // if user wants directions or Google Maps
    if(type === 'maps_open'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/maps/search/${query}`,'_blank');
    }
  case 'linkedin_open':
    // if user wants to open LinkedIn
    if(type === 'linkedin_open'){
      window.open('https://www.linkedin.com/','_blank');
    }
  case 'camera_open':
    // if user wants to open the camera
    if(type === 'camera_open'){
      speak("Sorry, camera access is restricted in browsers.");
    }
  case 'google_open':
    // if user wants to open Google homepage
     if(type === 'google_search'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`,'_blank');
    }
  case 'youtube_open':
    // if user wants to open YouTube homepage
    if(type === 'youtube_open'){
      window.open('https://www.youtube.com/','_blank');
    }
  case 'play_music':
    // if user requests a song or wants to play music
    if(type === 'play_music'){
      const query = encodeURIComponent(userInput);
      window.open(`https://open.spotify.com/search/${query}`,'_blank');
    }
  case 'open_settings':

        return res.status(200).json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });

        default:
          return res.status(400).json({
            type: 'invalid_type',
            userInput: gemResult.userInput,
            response: "I don't understand that command.",
          });
  }

} catch (error){

  return res.status(500).json({ message: "ask assistant error" });
}
}
