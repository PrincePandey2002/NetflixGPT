import { useDispatch, useSelector } from "react-redux";
import {addPopularMovies, addTopRatedMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect, useState } from "react";
import Error from "../components/Error";

const useTopRatedMovies=()=>{
  const [err,setErr]=useState(false);
    const dispatch=useDispatch();
    const topRatedMovies=useSelector(store=>store.movies.topRatedMovies);
    const getTopRatedMovies=async()=>{
      try{
          const rawMovies=await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
          if(!rawMovies.ok) throw new Error("An occured in fetching Top Rated Movies");
          const movies=await rawMovies.json();
          dispatch(addTopRatedMovies(movies.results));
      }
      catch(err){
        console.log("An occured in fetching Top Rated Movies");
        setErr(true);
      }
    //   console.log(`Top Rated movies => ${movies}`);
    }
    useEffect(()=>{
       !topRatedMovies && getTopRatedMovies();
      },[])
      return err;
}
export default useTopRatedMovies;