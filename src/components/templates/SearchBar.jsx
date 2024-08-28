import React , {useEffect, useState} from 'react'
import { motion } from "framer-motion";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import axios from '../../Utils/axios';


const SearchBar = ({setSearch}) => {
    
  const [val, setVal] = useState(false)
  const [query, setQuery] = useState("")
  const deleteQuery = () =>{
      setQuery("")
  }
  const handleSearches = (val) =>{
    setSearch(val)
  }
  const getSearches = async () =>{
    try {
      //We have made a get request for the search bar where /search/multi?query=${query} is searching for the query 
      const {data} = await axios.get(`/search/multi?query=${query}`);
      handleSearches(data.results)
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    getSearches()
  },[query])
  return (
    <motion.div className='relative searchIcon items-center w-[25vw] h-[5vh] flex overflow-hidden'>
        <IoSearchSharp className={`${val===false?"rotate-12":"rotate-0"}`} onClick={()=>setVal(!val)} fill='#D4D4D8' size={"1.8vw"} />
        <motion.div initial={{x: val===true?"-100%":"-100%"}} animate={{x: val===true?"15%":null}} transition={{ease: [0.45, 0, 0.55, 1], duration: 0.3}} className='absolute flex  items-center -translate-x-[100%]'>
            <input onChange={(det)=>setQuery(det.target.value)} className='text-zinc-300 text-xl outline-none border-none bg-transparent' type="text" placeholder='Movies' value={query} />
            {query.length>0 && <IoIosClose onClick={()=>deleteQuery()} fill='#D4D4D8' size={"2vw"} />}
        </motion.div>
    </motion.div>
  )
}

export default SearchBar