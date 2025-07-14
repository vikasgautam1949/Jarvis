import React, { useEffect } from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
// import { getGeminiResponse } from '../context/userContext'
import axios from 'axios'


const Home = () => {
  const { userData, serverUrl,setUserData,getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate()
  const handleLogOut=async () =>{
    try {
      await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate("/signin")
    } catch (error) {
      setUserData(null)
      console.log(error);
    }
  }


const speak=(text)=>{
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

const handleCommand = (data) => {
  const { type, userInput, response } = data;
  speak(response);

  if (type === 'google_search') {
    const query= encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  }

  if (type === 'youtube_search') {
    const query = encodeURIComponent(userInput);  
    window.open(`https://www.youtube.com/results?search_query=${query}`);
  }
  if (type === 'youtube_play') {
    const query = encodeURIComponent(userInput);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  }
  if (type === 'calculator_open') {
    window.open('https://www.calculator.net/', '_blank');
  }
  if (type === 'instagram_open') {
    window.open('https://www.instagram.com/', '_blank');
  }
  if (type === 'facebook_open') {
    window.open('https://www.facebook.com/', '_blank');
  }
  if (type === 'weather_show') {
    window.open('https://www.weather.com/', '_blank');
  }
  if (type === 'general') {
    // Handle general responses if needed

  }
}

// const speak = (text) => {
//   if (!text) return;

//   const synth = window.speechSynthesis;
//   const voices = synth.getVoices();

//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.volume = 1;
//   utterance.rate = 1;
//   utterance.pitch = 1;

//   if (voices.length > 0) {
//     utterance.voice = voices.find(voice => voice.lang === 'en-US') || voices[0];
//   }

//   synth.cancel(); // stop any previous speech
//   synth.speak(utterance);
// };


// const speak = (text) => {
//   if (!text) return;
//   window.speechSynthesis.cancel(); // stop previous
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.volume = 1;
//   utterance.rate = 1;
//   utterance.pitch = 1;

//   if (speechSynthesis.getVoices().length === 0) {
//     speechSynthesis.onvoiceschanged = () => {
//       speechSynthesis.speak(utterance);
//     };
//   } else {
//     speechSynthesis.speak(utterance);
//   }
// };

// useEffect(() => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

  
//   recognition.continuous = true; // Keep recognition active
//   recognition.lang='en-US'; // Set language to English

//   recognition.onresult = async (event) => {
//     const transcript = event.results[event.results.length-1][0].transcript;
//     console.log("Recognized speech:", transcript);

//     if(transcript.toLowerCase().includes(userData?.assistantName.toLowerCase())) {
//      const data = await getGeminiResponse(transcript);
//       console.log("Gemini response:", data);
      
//       speak(data.response);
//     }
//   }
  
//   recognition.start();
  
  
// }, []);


useEffect(() => {
  if (!userData || !userData.assistantName || !getGeminiResponse) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.lang = 'en-US';

  recognition.onresult = async (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    console.log("Recognized speech:", transcript);

    if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
      const data = await getGeminiResponse(transcript);
      console.log("Gemini response:", data);
      speak(data.response);
      handleCommand(data);
    }
  };

  //  Don't auto-start, wait for user click
   recognition.start();

  return () => {
    recognition.stop();
  };
}, [userData, getGeminiResponse]);


  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[15px]'>

      <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white absolute top-[20px] right-[20px] rounded-full text-[19px] cursor-pointer' onClick={handleLogOut} >Log Out
        </button>
       
        <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white absolute top-[100px] right-[20px] rounded-full text-[19px] px-[20px] py-[10px] cursor-pointer' onClick={()=>navigate("/customize")} > Customize Your Assistant
        </button>
        
      <div className='w-[300px] h-[400px] flex justify-center items-center flex-col gap-[20px] overflow-hidden rounded-4xl shadow-lg shadow-blue-950'>


    <img src={userData?.assistantImage} alt="Assistant image" className='w-full h-full object-cover rounded-4xl'
      
    />
    {console.log("assistantImage:", userData?.assistantImage)}


      </div>
    <h1 className='text-white text-[18px] font-semibold '>I'm {userData.assistantName}</h1>
    
       
    </div>
  )
}

export default Home