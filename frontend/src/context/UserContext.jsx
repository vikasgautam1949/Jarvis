import axios from "axios";
import React, { createContext, useState, useEffect } from "react";


export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);
  const [frontendImage, setfrontendImage] = useState(null)
  const [backendImage, setbackendImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

const getGeminiResponse = async (command) => {
  try {
    const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, {
      command,
      assistantName: userData?.assistantName,
      userName: userData?.name
    }, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log("getGeminiResponse error:", error?.response?.data || error.message);
    return { type: 'error', response: "Failed to get assistant response." };
  }
};




  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData, setUserData,
    handleCurrentUser,
    backendImage, setbackendImage,
    frontendImage, setfrontendImage,
    selectedImage, setSelectedImage, 
    getGeminiResponse
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;

