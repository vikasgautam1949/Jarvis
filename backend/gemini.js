

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
const geminiResponse = async (prompt) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL
    const result = await axios.post(
      apiUrl,
      {
       "contents": [
      {
        "parts": [
          {
            "text": prompt
          }
        ]
      }
    ]
      },
     
    );
    return result.data.response.contents[0].parts[0].text; // Adjusted to match the expected response structure
  } catch (error) {
    console.error("Error occurred while fetching Gemini response:", error?.response?.data || error.message);
    throw error;
  }
}

export default geminiResponse;