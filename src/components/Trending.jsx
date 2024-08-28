import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6"
import Dropdown from './templates/Dropdown'
import TCard from './templates/TCard'
import axios from ".././Utils/axios";
import Loader from './templates/Loader'
import InfiniteScroll from "react-infinite-scroll-component";
import InpageSearch from './templates/InpageSearch'

const Trending = () => {
  
    const navigate = useNavigate()
    const [category, setCategory] = useState("all")
    const [duration, setDuration] = useState("day")
    const [trending, setTrending] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [searchString, setSearchString] = useState("")
    document.title = "Epic Flix | Trending "+category.toUpperCase()

    const getTrending = async () =>{
        try {
          const {data} = await axios.get(`/trending/${category}/${duration}?page=${page}`);
          if(data.results.length > 0){
              setTrending((prevState)=>[...prevState, ...data.results]);
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
        if(trending.length===0){
            getTrending()
        }
        else{
            setPage(1)
            setTrending([])
            getTrending()
        }
      }

    useEffect(()=>{
        refreshHandler()
    },[category, duration ])

    console.log(trending)
    console.log(searchString)
  return (trending.length>0 ? 
    (<div className='w-screen h-screen px-[2vw] overflow-hidden overflow-y-auto'>
        <div className='w-full flex items-center justify-between px-[2vw] py-[.5vw]'>
            <div className='flex w-[50%] items-center py-[.3vw]'>
                <div className='flex items-center gap-[.7vw]'>
                    <FaArrowLeft onClick={()=>navigate(-1)} className='hover:text-[#6555CD] duration-300' />
                    <h1 className='text-2xl text-zinc-400 font-semibold'>Trending</h1>
                </div>
                <InpageSearch func={(data)=>setSearchString(data)} />
            </div>
            <div className='flex w-[20%] justify-center items-center gap-[1vw] py-[.3vw]'>
                <Dropdown title="Category" options={["movie", "tv", "all"]} setCat={(data)=>setCategory(data)} />
                <Dropdown title="Duration" options={["week", "day"]} setCat={(data)=>setDuration(data)} />
            </div>
        </div>
        <InfiniteScroll dataLength={trending.length} next={getTrending()} hasMore={hasMore} loader={<h1>Loading..</h1>} >
            <div className='w-full flex justify-center gap-[4vw] mt-[3vh] flex-wrap px-auto'>
                {trending.map((item, index)=><TCard key={index} data={item} title={category} />)}
            </div>
        </InfiniteScroll>
        
    </div>):<Loader />
  )
}

export default Trending

//Hmara data toh aagya h par voh vhi array of 20 elements h jo hmne axios se call kiya h
//To make it infinite hme yahan pe ek infinite loop lgana pdega just like pagination

