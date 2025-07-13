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