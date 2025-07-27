import React, { useState, useContext } from 'react';
import bg from '../assets/authBg.png';
import { TiEye } from "react-icons/ti";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { serverUrl } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      await axios.post(`${serverUrl}/api/auth/signup`, {
        name,
        email,
        password
      }, { withCredentials: true });

      setLoading(false);
      navigate('/signin');
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className='w-full h-screen bg-gradient-to-t from-black to-[#02023d] flex justify-center items-center flex-col' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
      <form
        onSubmit={handleRegister}
        className='w-[90%] h-[600px] max-w-[500px] bg-[#00000069] backdrop-blur-md flex flex-col p-5 rounded-lg shadow-lg shadow-blue-950 justify-center gap-5'
      >
        <h1 className='text-white text-2xl font-semibold mb-4'>
          Register to <span className='text-blue-400'>Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder='Enter your Name'
          className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2 rounded-full text-lg'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder='Enter your Email'
          className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2 rounded-full text-lg'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-lg relative flex items-center'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Enter your Password'
            className='w-full h-full outline-none bg-transparent text-white placeholder-gray-300 px-5 py-2 rounded-full pr-[45px]'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!showPassword ? (
            <TiEye
              className='absolute right-5 top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer'
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <IoIosEyeOff
              className='absolute right-5 top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer'
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        {err.length > 0 && (
          <p className='text-red-500 text-[17px] mt-[10px]'>{err}</p>
        )}

        <button
          type='submit'
          className='w-full h-[60px] bg-blue-400 text-white font-semibold text-lg rounded-full cursor-pointer hover:bg-blue-500 transition-all duration-300'
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className='text-white text-[16px] text-center'>
          Already have an account?{' '}
          <span className='text-blue-400 cursor-pointer' onClick={() => navigate('/signin')}>
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
