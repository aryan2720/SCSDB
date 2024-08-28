import React from 'react'
import notfound from "/404.gif";
const NotFound = () => {
  return (
    <div className='w-fit h-fit bg-black flex justify-center items-center'>
        <img className='h-[60%] object-cover' src={notfound} alt="img" />
    </div>
  )
}

export default NotFound