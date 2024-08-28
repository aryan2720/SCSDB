import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadPerson } from '../Store/actions/personActions'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import { FaEarthAmericas } from "react-icons/fa6";
import { BiLogoImdb } from "react-icons/bi";
import { TbBrandWikipedia } from "react-icons/tb";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Loader from './templates/Loader'
import { HorizontalCards } from './templates/HorizontalCards'
import Dropdown from "./templates/Dropdown";
import background from "/abstract-textured-backgound.jpg";

const PersonDetails = () => {
  //Is component data ka pathname nikal k dega ye useLocation()
  const { pathname } = useLocation()
  const cat = pathname.includes('movie')? 'movie' : 'tv'
  const navigate = useNavigate()
  //Routes ke through data aega id ka jo ki hum nikalenge useParams ke through
  const {id} = useParams()
  const [category, setCategory] = useState("movie")
  const dispatch = useDispatch()
  //data will be called at useEffect
  useEffect(()=>{
    // fetch person details using person id - yahan fetch hora h data 
    dispatch(asyncLoadPerson(id))
    return ()=>{
      //component will unmounting hua hume useEffect ke andar
      //dispatch ki person ki info null hua h
      dispatch(removePerson())
    }
  },[id])
   //person li details aap yahan pe access kroge redux k store k andr reducers se
   const { info } = useSelector(state=>state.person)
  // console.log(info)
  // console.log(category)
  return info?(
    <div style={{
      background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.9)), url(${background})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }} className='w-screen relative min-h-screen px-[10%]'>
      {/* Part 1 - navigation */}
      <nav className='w-full h-[10vh] flex items-center text-zinc-200'>
        <div className='w-fit flex justify-center items-center gap-[1vw]'>
          <FaArrowLeft size="1.3vw" onClick={()=>navigate(-1)} className='hover:text-[#6555CD] duration-300' />
            <div className='w-fit flex justify-center items-center gap-[2vw]'>
                <a target='_blank' href={`https://www.facebook.com/${info.externalids.facebook_id}`}><FaFacebook size="1.3vw" /></a>
                <a target='_blank' href={`https://www.imdb.com/title/${info.externalids.imdb_id}/`}><BiLogoImdb size="1.3vw" /></a>
                <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalids.wikidata_id}`}><TbBrandWikipedia size="1.3vw" /></a>
                <a target='_blank' href={`https://www.instagram.com/${info.externalids.instagram_id}/?hl=en`}><RiInstagramFill size="1.3vw" /></a>
            </div>
        </div>
      </nav>
      {/* Part 2 - poster and details  */}
      <div className='w-full mt-[2vw] flex gap-[1vw]'>
        <div className='w-[20%] h-[30%] overflow-hidden rounded-lg'>
          <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`} alt="image" />
        </div>
        <div className='w-[70%] px-[1vw]'>
            <div className='flex items-center gap-[.5vw]'>
              <h1 className='text-5xl font-semibold flex items-center gap-[.3vw] text-white tracking-tight'>{info.details.name}
              <small className='text-[1.4vw] text-zinc-200 font-regular tracking-tighter'>({info.details.birthday})</small>
              </h1>
              <span className='inline-block'>
                {info.details.popularity && <div className='w-[5vw] h-[5vw] text-zinc-200 flex items-center justify-center text-md font-semibold rounded-full bg-amber-600'>{info.details.popularity}</div>} 
              </span>
            </div>
            <div className='flex items-center gap-[.3vw]'>
              <h1 className='text-zinc-100 text-md tracking-tighter capitalize'>{info.details.gender===1?"female":"male"}</h1>
              <h1 className='text-zinc-100 text-md tracking-tighter'>{info.details.known_for_department}</h1>
            </div>
            <div className='flex items-center gap-[.3vw]'>
              <h1 className='text-zinc-100 font-semibold text-[1vw] tracking-tight flex gap-[.4vw] items-end'>Place of Birth<small className='inline-block text-zinc-200 text-[1vw] tracking-tighter'>{info.details.place_of_birth}</small></h1>
            </div>
            <div className='py-[1vw]'>
              <h1 className='text-xl font-semibold text-zinc-200 flex items-end gap-[.4vw]'>Also Known as: <span className='inline-block text-[1vw] font-semibold text-zinc-200 italic text'>{info.details.also_known_as.length>0?info.details.also_known_as.map((a)=>a).join(', '):info.details.also_known_as}</span></h1>
            </div>
            <div className='flex flex-col mt-[1vw]'>
              <h1 className='text-xl font-semibold tracking-tight text-white'>Biography</h1>
              <p className='text-md tracking-tighter text-zinc-100 italic'>{info.details.biography}</p>
            </div>
        </div>
      </div>
      {/* Work summary */}
      <div className='w-full h-fit mt-[1vw]'>
        <h1 className='text-white tracking-tight font-semibold mb-[.5vw] capitalize'>Work Summary</h1>
        <HorizontalCards data={info.combinedCredits.cast.length>0?info.combinedCredits.cast:null} category={cat} />
      </div>
      <div className='w-full h-fit mt-[1vw] flex justify-between'>
        <h1 className='text-white tracking-tight font-semibold mb-[.5vw] capitalize'>Acting</h1>
        <Dropdown title="category" options={["tv", "movie"]} setCat={(data)=>setCategory(data)} />        
      </div>
      <div className='list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,0.3)] border-2 border-zinc-800 p-5'>
        {info[category+"Credits"].cast.map((c,i)=>(<li key={i} className='hover:text-white duration-300 cursor-pointer'>
          <Link to={`/${category}/details/${c.id}`} className='flex flex-col'>
            <span className=''>{c.original_title || c.name || c.original_name || c.title}</span>
            <span className='inline-block'>{c.character}</span>
          </Link>
        </li>))}
        
      </div>
    </div>
  ):<Loader />
}

export default PersonDetails