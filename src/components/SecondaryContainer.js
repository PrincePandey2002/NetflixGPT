import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies=useSelector(store=>store.movies);
  // console.log("movies=>",movies);
  return movies.nowPlayingMovies && (
    <div className=' bg-black'>
      <div className='md:mt-[-280px] relative z-20 pl-2 md:pl-12'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
       <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
      {/* <MovieList title={"Drama"} movies={movies.nowPlayingMovies}/>  */}
      </div>
    </div>
  )
}

export default SecondaryContainer