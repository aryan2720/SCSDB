import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6"
import Dropdown from './templates/Dropdown'
import TCard from './templates/TCard'
import axios from ".././Utils/axios";
import Loader from './templates/Loader'
import InfiniteScroll from "react-infinite-scroll-component";
import InpageSearch from './templates/InpageSearch'


const Popular = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("movie")
    const [popular, setPopular] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [searchString, setSearchString] = useState("")
    document.title = "Epic Flix | Popular "+ category.toUpperCase()

    const getPopular = async () =>{
        try {
          const {data} = await axios.get(`${category}/popular?page=${page}`);
          if(data.results.length > 0){
              setPopular((prevState)=>[...prevState, ...data.results]);
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
        if(popular.length===0){
            getPopular()
        }
        else{
            setPage(1)
            setPopular([])
            getPopular()
        }
      }

    useEffect(()=>{
        refreshHandler()
    },[category])
  return  (popular.length>0 ? 
    (<div className='w-screen h-screen px-[2vw] overflow-hidden overflow-y-auto'>
        <div className='w-full flex items-center justify-between px-[2vw] py-[.5vw]'>
            <div className='flex w-[50%] items-center py-[.3vw]'>
                <div className='flex items-center gap-[.7vw]'>
                    <FaArrowLeft onClick={()=>navigate(-1)} className='hover:text-[#6555CD] duration-300' />
                    <h1 className='text-2xl text-zinc-400 font-semibold'>Popular</h1>
                </div>
                <InpageSearch func={(data)=>setSearchString(data)} />
            </div>
            <div className='flex w-[20%] justify-center items-center gap-[1vw] py-[.3vw]'>
                <Dropdown title="Category" options={["movie", "tv"]} setCat={(data)=>setCategory(data)} />
            </div>
        </div>
        <InfiniteScroll dataLength={popular.length} next={getPopular()} hasMore={hasMore} loader={<h1>Loading..</h1>} >
            <div className='w-full flex justify-center gap-[4vw] mt-[3vh] flex-wrap px-auto'>
                {popular.map((item, index)=><TCard key={index} data={item} title={category} />)}
            </div>
        </InfiniteScroll>
        
    </div>):<Loader />
  )
}

export default Popular