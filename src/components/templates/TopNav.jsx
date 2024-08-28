import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'

export default function TopNav() {
  const [search, setSearch] = useState([])
  
  
  return (
    <div className='relative w-[30vw] h-[8vh] px-2 py-3 flex '>
        <SearchBar setSearch={setSearch} />
        <div className='w-[100%] rounded-lg max-h-[50vh] bg-zinc-800 opacity-[90%] absolute z-[40] top-[100%] overflow-auto'>
            {search.map((s, i)=><Link to={`/${s.media_type}/details/${s.id}`} key={i} className='hover:text-black hover:bg-zinc-300 duration-300 inline-block w-full px-2 py-5 border-b-[.3vw] border-zinc-600 text-zinc-200 font-semibold flex items-center justify-between'>
                <div className='w-[30%] h-[18%] bg-red-100 rounded-lg overflow-hidden'>
                  <img className='w-full h-full object-cover' src={s.backdrop_path || s.profile_path?`https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path }`: `https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg`} alt="" />
                </div>
                <span className='inline block w-[15vw] text-sm tracling-tight text-right'>{s.original_name || s.name || s.original_title || s.title}</span>
            </Link>)}
        </div>
    </div>
  )
}