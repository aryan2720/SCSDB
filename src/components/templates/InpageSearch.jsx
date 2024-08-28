import React, { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { IoSearchSharp } from 'react-icons/io5'
const InpageSearch = ({func}) => {
    const [query, setQuery] = useState("")
    const deleteQuery = () =>{
        setQuery("")
    }
    func(query)
  return (
    <div className='w-[20vw] h-[5vh] flex items-center px-[.4vw] py-[.2vw] '>
        <IoSearchSharp fill='#D4D4D8' size={"1.8vw"} />
        <input onChange={(det)=>setQuery(det.target.value)} className='bg-transparent shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] flex items-center outline-none rounded-lg px-[.4vw] py-[.5vw] text-xl text-zinc-400' type="text" placeholder='Movies' value={query} />
        {query.length>0 && <IoIosClose onClick={()=>deleteQuery()} fill='#D4D4D8' size={"2vw"} />}
    </div>
  )
}

export default InpageSearch