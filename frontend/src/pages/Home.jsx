import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false);
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

  const startRecognition = () => {
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (error) {
      if (!error.message.includes('start')) {
        console.error('Recognition error:', error);
      }
    }
  };

  const speak = (text) => {
    if (!text || synth.speaking) {
      console.warn('Speech skipped or overlapping:', text);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    isSpeakingRef.current = true;

    utterance.onend = () => {
      isSpeakingRef.current = false;
      startRecognition();
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      isSpeakingRef.current = false;
      startRecognition();
    };

    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);
    const query = encodeURIComponent(userInput);
    const openUrl = (url) => window.open(url, '_blank');

    switch (type) {
      case 'google_search':
        openUrl(`https://www.google.com/search?q=${query}`);
        break;
      case 'youtube_search':
      case 'youtube_play':
        openUrl(`https://www.youtube.com/results?search_query=${query}`);
        break;
      case 'calculator_open':
        openUrl('https://www.calculator.net/');
        break;
      case 'instagram_open':
        openUrl('https://www.instagram.com/');
        break;
      case 'facebook_open':
        openUrl('https://www.facebook.com/');
        break;
      case 'weather_show':
        openUrl('https://www.weather.com/');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!userData || !userData.assistantName || !getGeminiResponse) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    const safeRecognition = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log('Recognition started by safeRecognition');
        } catch (err) {
          if (err.name !== 'InvalidStateError') {
            console.error('safeRecognition start error:', err);
          }
        }
      }
    };

    recognition.onstart = () => {
      console.log('Recognition started');
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log('Recognition ended');
      isRecognizingRef.current = false;
      setListening(false);
      setTimeout(safeRecognition, 1000);
    };

    recognition.onerror = (event) => {
      console.error('Recognition error:', event.error);
      isRecognizingRef.current = false;
      setListening(false);

      if (event.error !== 'aborted' && !isSpeakingRef.current) {
        setTimeout(safeRecognition, 1000);
      }
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      console.log('Recognized speech:', transcript);

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);

        const data = await getGeminiResponse(transcript);
        console.log('Gemini response:', data);
        handleCommand(data);
      }
    };

    // Keep recognition active every 10s if it stops
    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeRecognition();
      }
    }, 10000);

    // Start initial recognition
    setTimeout(safeRecognition, 1000);

    return () => {
      recognition.stop();
      isRecognizingRef.current = false;
      setListening(false);
      clearInterval(fallback);
    };
  }, [userData, getGeminiResponse]);

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
        <img
          src={userData?.assistantImage}
          alt="Assistant"
          className="w-full h-full object-cover rounded-4xl"
        />
        {console.log('assistantImage:', userData?.assistantImage)}
      </div>

      <h1 className="text-white text-[18px] font-semibold">I'm {userData?.assistantName}</h1>
    </div>
  );
};

export default Home;
