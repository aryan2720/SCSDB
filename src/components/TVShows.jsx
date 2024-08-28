import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6"
import Dropdown from './templates/Dropdown'
import TCard from './templates/TCard'
import axios from ".././Utils/axios";
import Loader from './templates/Loader'
import InfiniteScroll from "react-infinite-scroll-component";
import InpageSearch from './templates/InpageSearch'

const TVShows = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("airing_today")
    const [tvshows, setTvShows] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [searchString, setSearchString] = useState("")
    document.title = "Epic Flix | tvshows "+ category.toUpperCase()

    const getTvShows = async () =>{
        try {
          const {data} = await axios.get(`/tv/${category}?page=${page}`);
          if(data.results.length > 0){
              setTvShows((prevState)=>[...prevState, ...data.results]);
              setPage(page+1)
          }
          
          else{
            setHasMore(false);
          }
        } catch (error) {
          console.error(error);
        }
      }
      const refreshHandler = () => {
        if(tvshows.length===0){
            getTvShows()
        }
        else{
            setPage(1)
            setTvShows([])
            getTvShows()
        }
      }

    useEffect(()=>{
        refreshHandler()
    },[category])
  return (tvshows.length>0 ? 
    (<div className='w-screen h-screen px-[2vw] overflow-hidden overflow-y-auto'>
        <div className='w-full flex items-center justify-between px-[2vw] py-[.5vw]'>
            <div className='flex w-[50%] items-center py-[.3vw]'>
                <div className='flex items-center gap-[.7vw]'>
                    <FaArrowLeft onClick={()=>navigate(-1)} className='hover:text-[#6555CD] duration-300' />
                    <h1 className='text-2xl text-zinc-400 font-semibold'>Tvshows</h1>
                </div>
                <InpageSearch func={(data)=>setSearchString(data)} />
            </div>
            <div className='flex w-[20%] justify-center items-center gap-[1vw] py-[.3vw]'>
                <Dropdown title="Category" options={["popular", "top_rated", "on_the_air", "airing_today"]} setCat={(data)=>setCategory(data)} />
            </div>
        </div>
        <InfiniteScroll dataLength={tvshows.length} next={getTvShows()} hasMore={hasMore} loader={<h1>Loading..</h1>} >
            <div className='w-full flex justify-center gap-[4vw] mt-[3vh] flex-wrap px-auto'>
                {tvshows.map((item, index)=><TCard key={index} data={item} title="tv" />)}
            </div>
        </InfiniteScroll>
        
    </div>):<Loader />
  )
}

export default TVShows