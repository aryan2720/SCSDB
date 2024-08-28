import React from 'react'
import loader from "/SVKl.gif";
const Loader = () => {
  return (
    <div className='w-screen h-screen bg-black flex justify-center items-center'>
        <img className='h-[60%] object-cover' src={loader} alt="img" />
    </div>
  )
}

export default Loader