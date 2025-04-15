import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect, useState } from "react";
import Error from "../components/Error";

const useNowPlayingMovies=()=>{
    const [err,setErr]=useState(false);
    const dispatch=useDispatch();
    const nowPlayingMovies=useSelector(store=>store.movies.nowPlayingMovies);
    const getNowPlayingMovies=async()=>{
      try{
        const rawMovies=await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);

        if(!rawMovies.ok) throw new Error("Failed to fetch Now playing Movies");

        const movies=await rawMovies.json();
        dispatch(addNowPlayingMovies(movies.results));
      }
      catch(err){
        console.log("Error Occured",err);
        setErr(true);
      }
    //   console.log(movies);
    }
    useEffect(()=>{
      if(!nowPlayingMovies)
        getNowPlayingMovies();
    },[])
    return err;
}
export default useNowPlayingMovies;