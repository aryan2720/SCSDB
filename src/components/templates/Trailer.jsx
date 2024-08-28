import React from 'react'
import ReactPlayer from "react-player";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiWindowClose } from "react-icons/bi";
import NotFound from './NotFound';

const Trailer = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const category = pathname.includes("movie")?"movie":"tv"
    const ytVideo = useSelector((state)=>state[category].info.videos)
    console.log(ytVideo)
  return (
    <div className='absolute text-white top-0 left-0 bg-[rgba(0,0,0,.9)] z-[100] w-screen h-screen flex justify-center items-center'>
        <div className='w-fit h-fit relative'>
            <BiWindowClose size="1.3vw" onClick={()=>navigate(-1)} className='hover:text-[#6555CD] duration-300 absolute right-0 top-0' />
            {ytVideo?<ReactPlayer width={1500} height={700} url={`https://www.youtube.com/watch?v=${ytVideo.key}`} />:<NotFound />}
        </div>
        
    </div>
  )
}

export default Trailer