

// import axios from 'axios';

// const geminiResponse = async (prompt) => {
//   try {
//     const apiUrl = process.env.GEMINI_API_URL;
//     const apiKey = process.env.GEMINI_API_KEY;
//     const result = await axios.post(
//       apiUrl,
//       {
//         contents: [
//           {
//             parts: [
//               { text: prompt }
//             ]
//           }
//         ]
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${apiKey}`
//         }
//       }
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error occurred while fetching Gemini response:", error?.response?.data || error.message);
//     throw error;
//   }
// }

// export default geminiResponse;

import axios from 'axios';
const geminiResponse = async (prompt,assistantName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL


    const prompt= `You are a virtual assistant named ${assistantName} created by {auther name }.
    
    You are not google. you will now behave like a voice-enabled assistant.

    your task is to understand the user's natural language input and respond with a JSON object like this:

    {
      "type": "general" | "google_search" | "youtube_search" | "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",
      
      "userinput": "<orignal user input>" {only remove your name from userinput if exists} and agar kisi ne google ye youtube pe kuch search karne ko bola hai to userinput me only bo search bala text jaye,

      "response": "<a short spoken response to read out load to the user>"
    }
    `






    const result = await axios.post(
      apiUrl,
       {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
    );
    return result.data.candidates[0].content.parts[0].text; // Adjusted to match the expected response structure
  } catch (error) {
    console.error("Error occurred while fetching Gemini response:", error?.response?.data || error.message);
    throw error;
  }
}

export default geminiResponse;