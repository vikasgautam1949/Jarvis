import React, { useContext } from 'react'
import { userDataContext } from "../context/UserContext"; // Adjust the path if needed

const Card = ({image}) => {
  const {serverUrl,
    userData, setUserData,
    handleCurrentUser,
    backendImage, setbackendImage,
    frontendImage, setfrontendImage,
    selectedImage, setSelectedImage} = useContext(userDataContext)
  return (
    <div className={` w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-white${selectedImage==image?"border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={()=>{setSelectedImage(image)
      setbackendImage(null)
      setfrontendImage(null)
    }}>
      <img 
        src={image} 
        alt="Card Image" 
        className='w-full h-full object-cover' 
      />
      
      </div>
    
  )
}
export default Card