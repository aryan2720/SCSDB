import React from 'react'
import { HorizontalCards } from './templates/HorizontalCards'
import Dropdown from './templates/Dropdown'


const TrendingStripComponent = ({data,func, category}) => {
  return (
    <div className='w-full mt-2 px-5 py-3'>
        <div className='w-full mb-[.8vw] flex justify-between'>    
            <h1 className='text-3xl font-semibold tracking-tight text-zinc-400 '>Trending</h1>        
            <Dropdown title='filter' options={["tv", "movie", "all"]} setCat={func} />            
        </div>
        <HorizontalCards data={data} category={category} />        
    </div>
  )
}

export default TrendingStripComponent