// // import React, { useState, useContext } from 'react';
// // import bg from '../assets/authBg.png'
// // import { TiEye } from "react-icons/ti";
// // import { IoIosEyeOff } from "react-icons/io";
// // import { useNavigate } from "react-router-dom";
// // import { userDataContext } from "../context/UserContext";
// // import axios from "axios";

// // const SignUp = () => {
// //   const [showPassword, setShowPassword] = useState(false)
// //   const { serverUrl } = useContext(userDataContext)
// //   const navigate = useNavigate()

// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleSignup = async (e) => {
// //     e.preventDefault()
// //     try {
// //       let result = await axios.post(`${serverUrl}/api/auth/signup`, {
// //         name, email, password
// //       }, { withCredentials: true })
// //       console.log(result.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }
// //   return (
// //     <div
// //       className='w-full h-[100vh] flex justify-center items-center'
// //       style={{
// //         backgroundImage: `url(${bg})`,
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'center'
// //       }}
// //     >
// //       <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000083] backdrop-blur shadow-lg shadow-black flex flex-col justify-center items-center gap-[20px] px-[20px]' onSubmit={handleSignup}>

// //         <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
// //           Register to <span className='text-blue-400'>Virtual Assistant</span>
// //         </h1>

// //         <input
// //           type="text"
// //           placeholder='Enter your name'
// //           className='w-[80%] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
// //           required
// //           onChange={(e) => setName(e.target.value)}
// //           value={name}
// //         />

// //         <input
// //           type="email"
// //           placeholder='Enter your email'
// //           className='w-[80%] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
// //           required
// //           onChange={(e) => setEmail(e.target.value)}
// //           value={email}
// //         />

// //         <div className='w-[80%] h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative flex items-center'>
// //           <input
// //             type={showPassword ? "text" : "password"}
// //             placeholder='Enter your password'
// //             className='w-full h-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px] pr-[45px]'
// //             required
// //             onChange={(e) => setPassword(e.target.value)}
// //             value={password}
// //           />
// //           {!showPassword && <TiEye className='absolute right-[20px] top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer' onClick={() => setShowPassword(true)} />}
// //           {showPassword && <IoIosEyeOff className='absolute right-[20px] top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer' onClick={() => setShowPassword(false)} />}
// //         </div>
// //         <button className='w-[80%] h-[60px] bg-blue-500 text-white rounded-full text-[18px]'>Sign Up</button>
// //         <p className='text-white text-[16px]' onClick={() => navigate('/signin')}>
// //           Already have an account? <span className='text-blue-400 cursor-pointer'>Sign In</span></p>
// //       </form>
// //     </div>
// //   )
// // }

// // export default SignUp


// import React, { useState, useContext } from 'react';
// import bg from '../assets/authBg.png';
// import { TiEye } from "react-icons/ti";
// import { IoIosEyeOff } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import { userDataContext } from "../context/UserContext";
// import axios from "axios";

// const SignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { serverUrl, setUserData } = useContext(userDataContext);
//   const navigate = useNavigate();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await axios.post(
//         `${serverUrl}/api/auth/signup`,
//         { name, email, password },
//         { withCredentials: true }
//       );
//      setUserData(result.data);
//      setLoding(false);
//       // Optionally navigate after successful signup
//       navigate('/');
//     } catch (error) {
//       console.error('Signup error:', error?.response?.data || error.message);
//       setUserData(null);
//       setLoading(false);
//       setErr(error.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div
//       className="w-full h-screen flex justify-center items-center"
//       style={{
//         backgroundImage: `url(${bg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }}
//     >
//       <form
//         className="w-[90%] max-w-[500px] h-[600px] bg-[#00000083] backdrop-blur shadow-lg shadow-black flex flex-col justify-center items-center gap-[20px] px-[20px]"
//         onSubmit={handleSignup}
//       >
//         <h1 className="text-white text-[30px] font-semibold mb-[30px]">
//           Register to <span className="text-blue-400">Virtual Assistant</span>
//         </h1>

//         <input
//           type="text"
//           placeholder="Enter your name"
//           className="w-[80%] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
//           required
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//         />

//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="w-[80%] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
//           required
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//         />

//         <div className="w-[80%] h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative flex items-center">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter your password"
//             className="w-full h-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] pr-[45px] rounded-full text-[18px]"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//           {!showPassword ? (
//             <TiEye
//               className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer"
//               onClick={() => setShowPassword(true)}
//             />
//           ) : (
//             <IoIosEyeOff
//               className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer"
//               onClick={() => setShowPassword(false)}
//             />
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-[80%] h-[60px] bg-blue-500 text-white rounded-full text-[18px] hover:bg-blue-600 transition"
//         >
//           Sign Up
//         </button>

//         <p className="text-white text-[16px]">
//           Already have an account?{" "}
//           <span
//             className="text-blue-400 cursor-pointer"
//             onClick={() => navigate('/signin')}
//           >
//             Sign In
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignUp;



import React, { useState, useContext } from 'react';
import bg from '../assets/authBg.png';
import { TiEye } from "react-icons/ti";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr('');

    if (password !== confirmPassword) {
      return setErr("Passwords do not match");
    }

    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, {
        email,
        password,
      }, { withCredentials: true });

      setUserData(result.data);
      setLoading(false);
      navigate('/'); // Redirect after successful signup
    } catch (error) {
      console.log(error);
      setUserData && setUserData(null);
      setErr(error.response?.data?.message || "Sign up failed");
      setLoading(false);
    }
  };

  return (
    <div
      className='w-full h-[100vh] flex justify-center items-center'
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <form
        onSubmit={handleSignUp}
        className='w-[90%] h-[650px] max-w-[500px] bg-[#00000083] backdrop-blur shadow-lg shadow-black flex flex-col justify-center items-center gap-[20px] px-[20px]'
      >
        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
          Create Account on <span className='text-blue-400'>Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder='Enter your email'
          className='w-[80%] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        {/* Password Field */}
        <div className='w-[80%] h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative flex items-center'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Enter your password'
            className='w-full h-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] pr-[45px] rounded-full text-[18px]'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword
            ? <TiEye className='absolute right-[20px] top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer' onClick={() => setShowPassword(true)} />
            : <IoIosEyeOff className='absolute right-[20px] top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer' onClick={() => setShowPassword(false)} />}
        </div>

        {/* Confirm Password Field */}
        <div className='w-[80%] h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative flex items-center'>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder='Confirm your password'
            className='w-full h-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] pr-[45px] rounded-full text-[18px]'
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          {!showConfirm
            ? <TiEye className='absolute right-[20px] top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer' onClick={() => setShowConfirm(true)} />
            : <IoIosEyeOff className='absolute right-[20px] top-1/2 -translate-y-1/2 text-[24px] text-white cursor-pointer' onClick={() => setShowConfirm(false)} />}
        </div>

        {err.length > 0 && <p className='text-red-500 text-[17px] mt-[10px]'>{err}</p>}

        <button className='w-[80%] h-[60px] bg-blue-500 text-white rounded-full text-[18px]' disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className='text-white text-[16px] mt-[10px]' onClick={() => navigate('/signin')}>
          Already have an account? <span className='text-blue-400 cursor-pointer'>Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
