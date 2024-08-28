import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadMovie } from '../Store/actions/movieActions'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import { FaEarthAmericas } from "react-icons/fa6";
import { BiLogoImdb } from "react-icons/bi";
import { TbBrandWikipedia } from "react-icons/tb";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import Loader from './templates/Loader'
import { HorizontalCards } from './templates/HorizontalCards'

const MovieDetails = () => {
  //Is component data ka pathname nikal k dega ye useLocation()
  const { pathname } = useLocation()
  const category = pathname.includes('movie')? 'movie' : 'tv'
  const navigate = useNavigate()
  //Routes ke through data aega id ka jo ki hum nikalenge useParams ke through
  const {id} = useParams()
  const dispatch = useDispatch()
  //data will be called at useEffect
  useEffect(()=>{
    // fetch movie details using movie id - yahan fetch hora h data 
    dispatch(asyncLoadMovie(id))
    return ()=>{
      //component will unmounting hua hume useEffect ke andar
      //dispatch ki movie ki info null hua h
      dispatch(removeMovie())
    }
  },[id])
   //Movie li details aap yahan pe access kroge redux k store k andr reducers se
   const { info } = useSelector(state=>state.movie)
  // console.log(info)
  return info?(
    <div style={{
      background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path}`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }} className='w-screen relative min-h-screen px-[10%]'>
      {/* Part 1 - navigation */}
      <nav className='w-full h-[10vh] flex items-center text-zinc-200'>
        <div className='w-fit flex justify-center items-center gap-[1vw]'>
          <FaArrowLeft size="1.3vw" onClick={()=>navigate(-1)} className='hover:text-[#6555CD] duration-300' />
            <div className='w-fit flex justify-center items-center gap-[2vw]'>
                <a target='_blank' href=""><FaEarthAmericas size="1.3vw" /></a>
                <a target='_blank' href={`https://www.imdb.com/title/${info.externalids.imdb_id}/`}><BiLogoImdb size="1.3vw" /></a>
                <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalids.wikidata_id}`}><TbBrandWikipedia size="1.3vw" /></a>
                <a target='_blank' href={info.details.homepage}><FaExternalLinkSquareAlt size="1.3vw" /></a>
            </div>
        </div>
      </nav>
      {/* Part 2 - poster and details  */}
      <div className='w-full mt-[2vw] flex gap-[1vw]'>
        <div className='w-[20%] h-[30%] overflow-hidden rounded-lg'>
          <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${info.details.poster_path || info.details.backdrop_path }`} alt="image" />
        </div>
        <div className='w-[70%] px-[1vw]'>
            <div className='flex items-center gap-[.5vw]'>
              <h1 className='text-5xl font-semibold flex items-center gap-[.3vw] text-white tracking-tight'>{info.details.name || info.details.original_name || info.details.title || info.details.original_title}
              <small className='text-[1.4vw] text-zinc-200 font-regular tracking-tighter'>({info.details.release_date.split("-")[0]})</small>
              </h1>
              <span className='inline-block'>
                {info.details.vote_average && <div className='w-[2vw] h-[2vw] text-zinc-200 flex items-center justify-center text-md font-semibold rounded-full bg-amber-600'>{Math.floor(info.details.vote_average*10)}<sup>%</sup></div>} 
              </span>
            </div>
            <div className='flex items-center gap-[.3vw]'>
              <h1 className='text-zinc-100 text-md tracking-tighter'>{info.details.release_date}</h1>
              <h1 className='text-zinc-100 text-md tracking-tighter'>{info.details.genres.map(g=>g.name).join(", ")}</h1>
            </div>
            <div className='flex items-center gap-[.3vw]'>
              <h1 className='text-zinc-100 text-md tracking-tighter'>{info.details.runtime}min</h1>
            </div>
            <div className='py-[1vw]'>
              <h1 className='text-xl font-semibold italic text-zinc-200'>{info.details.tagline}</h1>
            </div>
            <div className='flex flex-col mt-[1vw]'>
              <h1 className='text-xl font-semibold tracking-tight text-white'>Overview</h1>
              <p className='text-md tracking-tighter text-zinc-100'>{info.details.overview}</p>
            </div>
            <Link to={`${pathname}/trailer`} className='inline-block font-semibold tracking-tight rounded-md text-white mt-[1.5vw] bg-[#6555CD] px-[2vw] py-[1vw]'>Play Trailer</Link>
        </div>
      </div>
      {/* Part 3 - Available on platforms/ Buy/ Rent - Platforms */}
      {info.watchproviders && info.watchproviders.flatrate && (
        <div className='w-full h-fit mt-[.9vw]'>
        <h1 className='text-xl text-white font-semibold tracking-tighter mb-[.4vw]'>Available On</h1>
        <div className='flex items-center gap-[1vw]'>
          {info.watchproviders.flatrate.map(rate=>(
          <div className='w-[3vw] h-[3vw] rounded-md overflow-hidden'>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${rate.logo_path}`} alt={rate.provider_name} />
          </div>
          ))}
        </div>
      </div>
      )}
      {info.watchproviders && info.watchproviders.buy && (
        <div className='w-full h-fit mt-[.9vw]'>
          <h1 className='text-xl text-white font-semibold tracking-tighter mb-[.4vw]'>Rent/Buy</h1>
          <div className='flex items-center gap-[1vw]'>
            {info.watchproviders.buy.map(b=>(
            <div className='w-[3vw] h-[3vw] rounded-md overflow-hidden'>
              <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${b.logo_path}`} alt={b.provider_name} />
            </div>
            ))}
          </div>
        </div>
      )}
      {/* Horizontal Cards recommendations and similar */}
      <div className='w-full h-fit'>
        <h1 className='text-white tracking-tight font-semibold mb-[.5vw]'>Recommendations</h1>
        <HorizontalCards data={info.recommendations.length>0?info.recommendations:info.similar} category={category} />
      </div>
      {/* Trailer */}
      <Outlet />
    </div>
  ):<Loader />
}

export default MovieDetails