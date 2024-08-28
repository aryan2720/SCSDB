import React from 'react'
import { Link } from 'react-router-dom'

const TCard = ({data, title}) => {
  // console.log(title)
  return (
    <div className='w-[15%] flex-shrink-0 rounded-lg mb-[1vw] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]'>
        <Link to={`/${data.media_type || title}/details/${data.id}`} className='relative flex flex-col justify-between rounded-lg'>
            <div className='w-full h-[60%]'>
                <img className='w-full h-full object-cover object-top overflow-hidden' src={`https://image.tmdb.org/t/p/original/${data.poster_path || data.backdrop_path || data.profile_path }`} alt="" />
            </div>
            <h1 className='text-2xl text-zinc-400 mt-[.4vw] font-semibold px-[.3vw] tracking-tight'>{data.title || data.original_title || data.name || data.original_name}</h1>
            {data.vote_average && <div className='absolute right-[-10%] w-[4vw] h-[4vw] text-zinc-200 flex items-center justify-center text-2xl font-semibold rounded-full bg-amber-600'>{Math.floor(data.vote_average*10)}<sup>%</sup></div>}
        </Link>
        
    </div>
  )
}

export default TCard


