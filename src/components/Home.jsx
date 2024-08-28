import React, { useEffect, useState } from 'react'
import SideNav from './templates/SideNav'
import TopNav from './templates/TopNav'
import Header from './templates/Header'
import axios from "../Utils/axios";
import TrendingStripComponent from './TrendingStripComponent';
import Loader from './templates/Loader';


function Home() {
    document.title = "Epic Flix | Homepage"

    const [wallpaper, setWallpaper] = useState(null)
    const getHeaderWallpaper = async () =>{
      try {
        //trending/all api se trending data get kiya aur use header m hr baar random pics dikhani h
        // ek random number index bna liya aur hr baar use useState variable m set krdiya 
        const {data} = await axios.get(`/trending/all/day`);
        let randomWallpaper = data.results[Math.floor(Math.random()*data.results.length)]
        setWallpaper(randomWallpaper);
      } catch (error) {
        console.error(error);
      }
    }
    const [category, setCategory] = useState("all")
    const [trending, setTrending] = useState([])
    
    const func = (data) => {
      setCategory(data)
    }
    const getTrending = async () =>{
      try {
        const {data} = await axios.get(`/trending/${category}/day`);
        setTrending(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(()=>{
      !wallpaper && getHeaderWallpaper()
      getTrending()
    },[category])
    console.log(category)
  return wallpaper && trending ? (
    <div className='w-full h-screen flex'>
        <SideNav />
        <div className='w-[80%] h-full overflow-hidden overflow-y-auto'>
          < TopNav />
          <Header data={wallpaper} />
          <TrendingStripComponent data={trending} category={category} func={func} />
        </div>

    </div>
  ):<Loader />
}

export default Home