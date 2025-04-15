import { useDispatch, useSelector } from "react-redux";
import {addPopularMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect, useState } from "react";
import Error from "../components/Error";

const usePopularMovies=()=>{
    const [err,setErr]=useState(false);
    const dispatch=useDispatch();
    const popularMovies=useSelector(store=>store.movies.popularMovies);
    const getPopularMovies=async()=>{
      try{
        const rawMovies=await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
        // if(!rawMovies)return <Error/>
        if(!rawMovies.ok) throw new Error("Error in fetcing popular movies");
        const movies=await rawMovies.json();
        dispatch(addPopularMovies(movies.results));
      }
      catch(err)
      {
        console.log("Error Occured in fetcing popular movies",err);
        setErr(true);
        
      }
    //   console.log(`Popular movies => ${movies}`);
    }
    useEffect(()=>{
        !popularMovies && getPopularMovies();
      },[])
      return err;
}
export default usePopularMovies;