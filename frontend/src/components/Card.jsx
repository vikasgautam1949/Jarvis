import React from 'react'

const Card = ({image}) => {
  return (
    <div className=' w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[blue] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-white'>
      <img 
        src={image} 
        alt="Card Image" 
        className='w-full h-full object-cover' 
      />
      
      </div>
    
  )
}

export default Card