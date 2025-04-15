import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResults } from '../utils/gptSlice';

const GptSearchBar =()=> {
    const langKey=useSelector(store=>store.config.lang);
    const searchText=useRef(null);
    const dispatch=useDispatch();

    const searchTMDBMovie= async(movieName)=>{
      const data=await fetch("https://api.themoviedb.org/3/search/movie?query="+movieName+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
      const json=await data.json();
      return json.results;
    }

    const handleGPTSearch=async()=>{
      console.log(searchText.current.value);
      const gptQuery="Act as a Movie Recommendation system and suggests some movies for the query :"+searchText.current.value +". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Koi mil Gaya, Gomaal, Mai Khiladi tu Anari, Jeene Nahi Dunga";
      const getResults=await openai.chat.completions.create({
        messages:[{role:"user", content:gptQuery}],
        model:"gpt-3.5-turbo"
      });
      console.log(getResults.choices?.[0]?.message.content);
      const gptMovies=getResults.choices?.[0]?.message.content.split(",");
      const promiseArray=gptMovies.map((movie)=>searchTMDBMovie(movie));
      const tmdbResults=await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(addGptMovieResults({movieNames:gptMovies,movieResults:tmdbResults}));
    }
  return (
    <div className=' pt-[35%] md:pt-[10%] flex justify-center'>
        <form onSubmit={(e)=>e.preventDefault()} className='w-full md:w-1/2 bg-black grid grid-cols-12'>
            <input ref={searchText} className=' p-2 m-2 md:p-4 md:m-4 col-span-9 rounded-lg' type='text' placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button onClick={handleGPTSearch} className=' col-span-3 m-2 p-2 md:py-2 md:px-4 md:m-4 rounded-lg bg-red-800 text-white'>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar