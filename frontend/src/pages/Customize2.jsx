import React, { useState, useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const Customize2 = () => {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext);

  const [assistantName, setAssistantName] = useState(userData?.AssistantName || '');
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdateAssistant = async () => {
    
    try {
      setLoading(true);
   let formData = new FormData();
formData.append('assistantName', assistantName);

if (backendImage) {
  formData.append('assistantImage', backendImage);
} else {
  formData.append('imageUrl', selectedImage); // fallback for predefined images
}
const result = await axios.post(`${serverUrl}/api/user/update`, formData, {
  withCredentials: true,
});

console.log('Updated user from server:', result.data);
setUserData(result.data); 
navigate("/")


      if (result.data) {
        setUserData(result.data);
        console.log('User data updated:', result.data);
        alert('Assistant updated successfully!');
      } else {
        console.error('Empty response received from server.');
      }
    } catch (error) {
      console.error('Error updating assistant:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-[20px] relative'>

      <IoArrowBackOutline  className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate("/customize")} />
      
      <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
        Enter Your <span className='text-blue-400'>Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder='Enter your assistant name'
        className='w-[50%] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />
      

      {assistantName && (
        <button
          className='w-[30%] h-[60px] bg-blue-500 text-white rounded-full text-[18px] mt-[20px] cursor-pointer disabled:opacity-50'
          onClick={()=>{
            handleUpdateAssistant()
          } }
          disabled={loading}
        >
          
          {loading ? 'Updating...' : 'Finally Create Your Assistant'}
        </button>
        
      )}
    </div>
  );
};

export default Customize2;
