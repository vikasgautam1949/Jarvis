import React, { useRef, useContext } from 'react'
import Card from '../components/Card'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg' 
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import { FaFileImage } from "react-icons/fa6";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'
import { IoArrowBackOutline } from "react-icons/io5";


const Customize = () => {
  const inputImage = useRef();
  
  const {
    serverUrl,
    userData, setUserData,
    handleCurrentUser,
    backendImage, setbackendImage,
    frontendImage, setfrontendImage,
    selectedImage, setSelectedImage
  } = useContext(userDataContext);
  const navigate = useNavigate();
  
  
  const handleImage = (e) => {
    const file = e.target.files[0];
    setbackendImage(file);
    setfrontendImage(URL.createObjectURL(file));
  }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]'>

       <IoArrowBackOutline
  className='absolute z-50 top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer'
  onClick={() => { console.log("clicked"); navigate("/"); }}
/>
      <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
        Select your <span className='text-blue-400'>Virtual Assistant</span>
      </h1>
      <div className='w-[90%] max-w-[60%] flex justify-center items-center gap-[15px] flex-wrap'>
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        <div
          className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-white flex justify-center items-center flex-col ${selectedImage === "input" ? "border-4 border-white shadow-2xl shadow-blue-950" : ""}`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && <FaFileImage className='text-white w-[25px] h-[25px]' />}
          {frontendImage && <img src={frontendImage} className='h-full object-cover' alt="Uploaded" />}
          <p className='text-white'>Upload</p>
          <input
            type='file'
            accept='image/*'
            ref={inputImage}
            hidden
            onChange={handleImage}
          />
        </div>
      </div>
      {selectedImage && <button className='w-[10%] h-[60px] bg-blue-500 text-white rounded-full text-[18px] mt-[20px] cursor-pointer' onClick={()=>navigate("/customize2")}> Next</button>}
      
    </div>
  )
}

export default Customize
