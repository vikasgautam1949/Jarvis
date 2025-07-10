import React, { useState, useContext } from 'react';
import bg from '../assets/authBg.png'
import { TiEye } from "react-icons/ti";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { serverUrl } = useContext(userDataContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [password, setPassword] = useState('');


  const [err, setErr] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault()
    setErr('');
    setLoading(true);
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signin`, {
         email, password
      }, { withCredentials: true })
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error.response.data.message);
    }
  }
  return (
    <div
      className='w-full h-[100vh] flex justify-center items-center'
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000083] backdrop-blur shadow-lg shadow-black flex flex-col justify-center items-center gap-[20px] px-[20px]' onSubmit={handleSignIn}>

        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
          Sign-In to <span className='text-blue-400'>Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder='Enter your email'
          className='w-[80%] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className='w-[80%] h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative flex items-center'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Enter your password'
            className='w-full h-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px] pr-[45px]'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword && <TiEye className='absolute right-[20px] top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer' onClick={() => setShowPassword(true)} />}
          {showPassword && <IoIosEyeOff className='absolute right-[20px] top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer' onClick={() => setShowPassword(false)} />}
        </div>

        {err.length>0 && <p className='text-red-500 text-[17px] mt-[10px]'>
          {err}
          </p>}

        <button className='w-[80%] h-[60px] bg-blue-500 text-white rounded-full text-[18px]' disabled={loading}>{loading?"Loading...":"Sign in"}</button>
        <p className='text-white text-[16px]' onClick={() => navigate('/signup')}>
          Want to create a new account? <span className='text-blue-400 cursor-pointer'>Sign Up</span></p>
      </form>
    </div>
  )
}

export default SignIn