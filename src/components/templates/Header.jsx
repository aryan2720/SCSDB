import React from 'react'
import { HiSpeakerphone } from "react-icons/hi";
import { IoIosTv } from "react-icons/io";
import { Link } from 'react-router-dom';

const Header = ({data}) => {
  return (
    <div className='w-full h-[50vh] relative rounded-md overflow-hidden mt-[1.4vw]'>
        <div className='w-[100%] top-0 z-[20] h-[100%] opacity-[60%] absolute bg-zinc-900'></div>
        <img className='w-full h-full z-[10] object-cover object-["top 10%  "]' src={`https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path }`} alt="" />
        <div className='absolute top-0 px-10 py-10 z-[30] w-full h-full text-white flex flex-col justify-end gap-[.8vw]'>
            <div className='flex flex-col gap-[1vw]'>
                <h1 className='text-5xl shadow-zinc-100 font-semibold tracking-tighter '>{data.title || data.original_title || data.name || data.original_name}</h1>
                <p className='text-xs text-zinc-200 w-[70%] tracking-tighter leading-none'>{data.overview.slice(0,200)}</p>
            </div>
            <div className='flex items-center gap-[.7vw]'>
                <h1 className='flex items-center gap-[.2vw] text-sm tracking-tighter font-normal text-white'><HiSpeakerphone fill='#f59e0b' /> {data.release_date || "Coming Soon"}</h1>
                <h1 className='flex items-center gap-[.2vw] text-sm tracking-tighter font-normal text-white uppercase'><IoIosTv fill='#f59e0b' /> {data.media_type}</h1>
            </div>
            <Link className='capitalize px-3 tracking-tight py-5 bg-[#6555CD] w-fit rounded-lg text-sm font-semibold'>Watch Trailer</Link>
        </div>
    </div>
  )
}

export default Header