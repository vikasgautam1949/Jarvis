import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const { userData, serverUrl,setUserData } = useContext(userDataContext);
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
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[15px]'>

      <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white absolute top-[20px] right-[20px] rounded-full text-[19px] cursor-pointer' onClick={handleLogOut} >Log Out
        </button>
       
        <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white absolute top-[100px] right-[20px] rounded-full text-[19px] px-[20px] py-[10px] cursor-pointer' onClick={()=>navigate("/customize")} > Customize Your Assistant
        </button>
        
      <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-col gap-[20px] overflow-hidden rounded-4xl'>


    <img src={userData?.assistantImage || '/default-assistant.png'} alt="Assistant image"
      
    />
    {console.log("assistantImage:", userData?.assistantImage)}


      </div>
    <h1 className='text-white '>I'm {userData.assistantName}</h1>
    
       
    </div>
  )
}

export default Home