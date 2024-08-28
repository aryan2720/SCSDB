import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import TVShows from './components/TVShows'
import People from './components/People'
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import PersonDetails from "./components/PersonDetails";
import Trailer from './components/templates/Trailer'

function App() {
  return (
    <div className='w-screen min-h-screen bg-[#1F1E24]'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<MovieDetails />}>
          <Route path='/movie/details/:id/trailer' element={<Trailer />} />
        </Route>
        <Route path='/tv' element={<TVShows />} />
        <Route path='/tv/details/:id' element={<TvDetails />}>
          <Route path='/tv/details/:id/trailer' element={<Trailer />} />
        </Route>
        <Route path='/person' element={<People />} />
        <Route path='/person/details/:id' element={<PersonDetails />} />
        
      </Routes>

    </div>
  )
}

export default App