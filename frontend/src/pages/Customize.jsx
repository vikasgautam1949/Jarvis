import React, { useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg' 
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import { FaFileImage } from "react-icons/fa6";

const Customize = () => {
  const [frontendImage, setfrontendImage] = useState(null)
  const [backendImage, setbackendImage] = useState(null)
  const inputImage = useRef()
  const handleImage = (e) =>{
    const file = e.target.files[0]
    setbackendImage(file)
    setfrontendImage(URL.createObjectURL(file))
  }


  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col'>

      <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
        Select your <span className='text-blue-400'>Virtual Assistant</span>
        </h1>
      <div className='w-[90%] max-w-[60%] flex justify-center items-center gap-[15px] flex-wrap'>
      {/* <Card image1={image1}/>
      <Card image2={image2}/>
      <Card image3={image3}/>
      <Card image4={image4}/>
      <Card image5={image5}/>
      <Card image6={image6}/>
      <Card image7={image7}/> */}

      <Card image={image1} />
      <Card image={image2} />
      <Card image={image3} />
      <Card image={image4} />
      <Card image={image5} />
      <Card image={image6} />
      <Card image={image7} />

<div
  className='w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-white flex justify-center items-center flex-col'
  onClick={() => inputImage.current.click()}
>
  {!frontendImage && <FaFileImage className='text-white w-[25px] h-[25px]' />}
  {frontendImage && <img src={frontendImage} className='h-full object-cover' />}
  <p className='text-white'>Upload</p>
  <input
    type='file'
    accept='image/*'
    ref={inputImage}
    hidden
    onChange={handleImage}
  />
</div>
      {/* <Card image={image7} />

       <div className='w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-white flex justify-center items-center' onClick={()=>inputImage.currentclick()}>
        {!frontendImage && <FaFileImage className='text-white w-[25px] h-[25px]' />}
        {frontendImage && <img src={frontendImage} className='h-full object-cover'/>}
        <p className='text-white'>Upload</p>
      


      <input type='file' accept='image/*' ref={inputImage}hidden onChange={handleImage}/>
      </div> */}
      </div>
      <button className='w-[10%] h-[60px] bg-blue-500 text-white rounded-full text-[18px] mt-[20px]'> Next</button>

    </div>
  )
}

export default Customize