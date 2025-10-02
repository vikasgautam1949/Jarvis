import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);

  const isSpeakingRef = useRef(false);
  // const isRecognizingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate('/signin');
    } catch (error) {
      setUserData(null);
      console.error(error);
    }
  };

  
  //   // if (!text) return;

  //   const speakWithVoice = () => {
  //     const utterance = new SpeechSynthesisUtterance(text);
  //     utterance.lang = 'hi-IN';

  //     const voices = synth.getVoices();
  //     const hindiVoice = voices.find(v => v.lang === 'hi-IN' || v.name.toLowerCase().includes('hindi'));

  //     if (hindiVoice) {
  //       utterance.voice = hindiVoice;
  //     } else {
  //       console.warn('Hindi voice not found, using default.');
  //     }

  //     isSpeakingRef.current = true;

  //     utterance.onend = () => {
  //       isSpeakingRef.current = false;
  //       startRecognition();
  //     };

  //     utterance.onerror = (e) => {
  //       console.error('Speech synthesis error:', e);
  //       isSpeakingRef.current = false;
  //       startRecognition();
  //     };

  //     synth.speak(utterance);
  //   };

  //   if (!synth.getVoices().length) {
  //     synth.onvoiceschanged = () => speakWithVoice();
  //   } else {
  //     speakWithVoice();
  //   }
  // };

  // const handleCommand = (data) => {
  //   const { type, userInput, response } = data;
  //   const query = encodeURIComponent(userInput);
  //   const openUrl = (url) => window.open(url, '_blank');

  //   const knownTypes = new Set([
  //     'general', 'google_search', 'youtube_search', 'youtube_play',
  //     'wikipedia_search', 'news_show', 'get_time', 'get_date', 'get_day',
  //     'get_month', 'get_year', 'calculator_open', 'instagram_open',
  //     'facebook_open', 'whatsapp_open', 'gmail_open', 'maps_open',
  //     'linkedin_open', 'youtube_open', 'google_open', 'play_music',
  //     'camera_open', 'open_settings', 'weather_show'
  //   ]);

  //   if (!type || !knownTypes.has(type)) {
  //     speak("Sorry, I didn't understand that command.");
  //     return;
  //   } else {
  //     speak(response);
  //   }

  //   switch (type) {
  //     case 'google_search':
  //       openUrl(`https://www.google.com/search?q=${query}`);
  //       break;
  //     case 'youtube_search':
  //     case 'youtube_play':
  //       openUrl(`https://www.youtube.com/results?search_query=${query}`);
  //       break;
  //     case 'wikipedia_search':
  //       openUrl(`https://en.wikipedia.org/wiki/${query}`);
  //       break;
  //     case 'news_show':
  //       openUrl(`https://news.google.com`);
  //       break;
  //     case 'calculator_open':
  //       openUrl('https://www.calculator.net/');
  //       break;
  //     case 'instagram_open':
  //       openUrl('https://www.instagram.com/');
  //       break;
  //     case 'facebook_open':
  //       openUrl('https://www.facebook.com/');
  //       break;
  //     case 'whatsapp_open':
  //       openUrl('https://web.whatsapp.com/');
  //       break;
  //     case 'weather_show':
  //       openUrl('https://www.weather.com/');
  //       break;
  //     case 'gmail_open':
  //       openUrl('https://mail.google.com/');
  //       break;
  //     case 'maps_open':
  //       openUrl(`https://www.google.com/maps/search/${query}`);
  //       break;
  //     case 'linkedin_open':
  //       openUrl('https://www.linkedin.com/');
  //       break;
  //     case 'youtube_open':
  //       openUrl('https://www.youtube.com/');
  //       break;
  //     case 'google_open':
  //       openUrl('https://www.google.com/');
  //       break;
  //     case 'play_music':
  //       openUrl(`https://open.spotify.com/search/${query}`);
  //       break;
  //     case 'camera_open':
  //       speak("Sorry, camera access is restricted in browsers.");
  //       break;
  //     case 'open_settings':
  //       speak("Settings feature is not implemented yet.");
  //       break;
  //     case 'get_time':
  //       speak(`The current time is ${new Date().toLocaleTimeString()}`);
  //       break;
  //     case 'get_date':
  //       speak(`Today's date is ${new Date().toLocaleDateString()}`);
  //       break;
  //     case 'get_day':
  //       speak(`Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`);
  //       break;
  //     case 'get_month':
  //       speak(`This month is ${new Date().toLocaleDateString('en-US', { month: 'long' })}`);
  //       break;
  //     case 'get_year':
  //       speak(`The year is ${new Date().getFullYear()}`);
  //       break;
  //     case 'general':
  //       break;
  //     default:
  //       break;
  //   }
  // };
const startRecognition= () =>{
  try {
    recognitionRef.current.start();
    setListening(true);
  } catch (error) {
    if(!error.message.includes("start")){
      console.log("Recognition start error:", error);
    }
  }
}

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  isSpeakingRef.current = true;
  utterance.onend = () => {
    isSpeakingRef.current = false;
   startRecognition();
  };
  synth.speak(utterance);
}
  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if(type === 'google_search'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`,'_blank');
    }
    if(type === 'youtube_search' || type === 'youtube_play'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`,'_blank');
    }
    if(type === 'wikipedia_search'){
      const query = encodeURIComponent(userInput);
      window.open(`https://en.wikipedia.org/wiki/${query}`,'_blank');
    }
    if(type === 'news_show'){
      window.open(`https://news.google.com`,'_blank');
    }
    if(type === 'calculator_open'){
      window.open('https://www.calculator.net/','_blank');
    }
    if(type === 'instagram_open'){
      window.open('https://www.instagram.com/','_blank');
    }
    if(type === 'facebook_open'){
      window.open('https://www.facebook.com/','_blank');
    }
    if(type === 'whatsapp_open'){
      window.open('https://web.whatsapp.com/','_blank');
    }
    if(type === 'weather_show'){
      window.open('https://www.weather.com/','_blank');
    }
    if(type === 'gmail_open'){
      window.open('https://mail.google.com/','_blank');
    }
    if(type === 'maps_open'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/maps/search/${query}`,'_blank');
    }
    if(type === 'linkedin_open'){
      window.open('https://www.linkedin.com/','_blank');
    }
    if(type === 'youtube_open'){
      window.open('https://www.youtube.com/','_blank');
    }
    if(type === 'google_open'){
      window.open('https://www.google.com/','_blank');
    }
    if(type === 'play_music'){
      const query = encodeURIComponent(userInput);
      window.open(`https://open.spotify.com/search/${query}`,'_blank');
    }
    if(type === 'camera_open'){
      speak("Sorry, camera access is restricted in browsers.");
    }
    if(type === 'open_settings'){
      speak("Settings feature is not implemented yet.");
    }
    if(type === 'get_time'){
      speak(`The current time is ${new Date().toLocaleTimeString()}`);
    }
    if(type === 'get_date'){
      speak(`Today's date is ${new Date().toLocaleDateString()}`);
    }
    if(type === 'get_day'){
      speak(`Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`);
    }
    if(type === 'get_month'){
      speak(`This month is ${new Date().toLocaleDateString('en-US', { month: 'long' })}`);
    }
    if(type === 'get_year'){
      speak(`The year is ${new Date().getFullYear()}`);
    }
    if(type === 'general'){
      speak("I'm not sure how to help with that.");
    }
  }

  
  useEffect(() => {
    // if (!userData || !userData.assistantName || !getGeminiResponse) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    const isRecognizingRef = {current: false};

     const safeRecognition = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
            try {
           recognition.start();
           console.log("Recognition started");
       } catch (err) {
           if (err.name !== 'InvalidStateError') {
             console.error('Safe recognition start error:', err);
           }
         }
       }
     };

    recognition.onstart = () => {
      console.log("Recognition started");
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      isRecognizingRef.current = false;
      setListening(false);
      // setTimeout(safeRecognition, 1000);

      if (!isSpeakingRef.current) {
        setTimeout(() => {
          safeRecognition();
        }, 1000);
      }
    };


  recognition.onerror=(event) => {
    console.log("Recognition error:", event.error);
    isRecognizingRef.current = false;
    setListening(false);

    if (event.error !== 'aborted' && !isSpeakingRef.current) {
      setTimeout(() => {
        safeRecognition();
      }, 1000);
    }
  };

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      console.log('Transcript:', transcript);
    
      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
      
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
         const data = await getGeminiResponse(transcript);
         console.log('Gemini response:', data);
        //  speak(data.response);
        handleCommand(data);
      }
    };


    const fallback= setInterval(()=>{
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeRecognition();
      }
    }, 10000);

    safeRecognition();
    return () => {
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
      clearInterval(fallback);
    };

  }, []);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#02023d] flex justify-center items-center flex-col gap-[15px]">
      <button
        className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white absolute top-[20px] right-[20px] rounded-full text-[19px] cursor-pointer"
        onClick={handleLogOut}
      >
        Log Out
      </button>

      <button
        className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white absolute top-[100px] right-[20px] rounded-full text-[19px] px-[20px] py-[10px] cursor-pointer"
        onClick={() => navigate('/customize')}
      >
        Customize Your Assistant
      </button>

      <div className="w-[300px] h-[400px] flex justify-center items-center flex-col gap-[20px] overflow-hidden rounded-4xl shadow-lg shadow-blue-950">      
       <img src={userData?.assistantImage}
          alt="Assistant"
          className="w-full h-full object-cover rounded-4xl"
        />
        {console.log('assistantImage:', userData?.assistantImage)}
      </div>

      <h1 className="text-white text-[18px] font-semibold">I'm {userData?.assistantName}</h1>
      {listening && <p className="text-green-300 mt-2">🎙 Listening...</p>}
    </div>
  );
};

export default Home;

