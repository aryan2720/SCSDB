import React, { createElement } from 'react'
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { IoPeople } from "react-icons/io5";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";
import { SiShowtime } from "react-icons/si";
import { FcAbout } from "react-icons/fc";
import { MdPermContactCalendar } from "react-icons/md";




function SideNav() {

  
  return (
    <div className='w-[20%] h-full border-r-[2px] border-zinc-600 px-10 py-3 text-white'>
        <h1 className='flex items-center gap-[.4vw] text-2xl font-bold'><PiTelevisionSimpleFill fill='#6555CD' />Epic Flix</h1>
        <nav className='text-xl'>
            <h1 className='font-semibold text-zinc-300 mt-10 mb-5 '>New Feeds</h1>
            <div className='flex flex-col gap-[1vw] text-zinc-400'>
            <Link to="/trending" className={`hover:bg-[#6555CD] hover:text-white hover:p-[1vw] duration-300 rounded-lg flex items-center gap-[.5vw] p-[.3vw] text-[1.2vw] tracking-tight navel`}><FaFireFlameCurved fill='#6555CD' />Trending</Link>
            <Link to="/popular" className={`hover:bg-[#6555CD] hover:text-white hover:p-[1vw] duration-300 rounded-lg flex items-center gap-[.5vw] p-[.3vw] text-[1.2vw] tracking-tight navel`}><FaWandMagicSparkles fill='#6555CD' />Popular</Link>
            <Link to="/movie" className={`hover:bg-[#6555CD] hover:text-white hover:p-[1vw] duration-300 rounded-lg flex items-center gap-[.5vw] p-[.3vw] text-[1.2vw] tracking-tight navel`}><MdLocalMovies fill='#6555CD' />Movies</Link>
            <Link to="/tv" className={`hover:bg-[#6555CD] hover:text-white hover:p-[1vw] duration-300 rounded-lg flex items-center gap-[.5vw] p-[.3vw] text-[1.2vw] tracking-tight navel`}><SiShowtime fill='#6555CD' />TV Shows</Link>
            <Link to="/person" className={`hover:bg-[#6555CD] hover:text-white hover:p-[1vw] duration-300 rounded-lg flex items-center gap-[.5vw] p-[.3vw] text-[1.2vw] tracking-tight navel`}><IoPeople fill='#6555CD' />People</Link>
            </div>
            <div className='w-full h-[.1px] bg-zinc-600 mt-[2vw]'></div>
            <div className='flex flex-col gap-[1vw] py-4 text-zinc-400 mt-10'>
              <Link className={`hover:bg-[#6555CD] hover:text-white hover:p-[1vw] duration-300 rounded-lg flex items-center gap-[.5vw] p-[.3vw] text-[1.2vw] tracking-tight navel`}><FcAbout fill='#6555CD' />About Epic Flix</Link>
              <Link className={`hover:bg-[#6555CD] hover:text-white hover:p-[1vw] duration-300 rounded-lg flex items-center gap-[.5vw] p-[.3vw] text-[1.2vw] tracking-tight navel`}><MdPermContactCalendar fill='#6555CD' />Contact Us</Link>
            </div>
        </nav>
    </div>
  )
}

export default SideNav