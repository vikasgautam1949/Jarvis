import React, { useState } from 'react'
import {userDataContext} from '../context/UserContext'

const Customize2 = () => {
  const { userData } = React.useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(userData?.AssistantName || '');
  return (
    <div  className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]'>
    
    <h1  className='text-white text-[30px] font-semibold mb-[30px]' >Enter Your <span className='text-blue-400'>Assistant Name</span></h1>

    <input
      type="text" 
      placeholder='Enter your assistant name'
      className='w-[50%] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
      required
      onChange={(e) => setAssistantName(e.target.value)}
      value={assistantName}
    />
    {assistantName &&  <button className='w-[30%] h-[60px] bg-blue-500 text-white rounded-full text-[18px] mt-[20px] cursor-pointer' onClick={()=>navigate("/customize2")} > Finnaly Create Your Assistant</button>}
    </div>
  )
}

export default Customize2