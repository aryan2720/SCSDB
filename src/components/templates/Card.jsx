import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({data, title}) => {
  return (
    <div className='w-[30vh] h-full bg-zinc-900 text-white rounded-md overflow-hidden flex-shrink-0'>
        <Link to={`/${title}/details/${data.id}`} className='w-full h-full'>
          <div className='w-full h-[55%]'>
              <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${data.backdrop_path || data.poster_path }`} alt="" />
          </div>
          <div className='w-full mt-[.8vw]'>
              <h1 className='text-sm font-semibold tracking-tight '>{data.title || data.original_title || data.name || data.original_name}</h1>
              <p className='text-xs tracking-tighter text-zinc-300'>{data.overview.slice(0,100)} <span className='text-blue-700'>more</span> </p>
          </div>
        </Link>
    </div>
  )
}

export default Card