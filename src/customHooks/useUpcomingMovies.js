import { useDispatch, useSelector } from "react-redux";
import {addUpcomingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect, useState } from "react";
import Error from "../components/Error";

const useUpcomingMovies=()=>{
    const [err,setErr]=useState(false);
    const dispatch=useDispatch();
    const upcomingMovies=useSelector(store=>store.movies.upcomingMovies);
    const getUpcomingMovies=async()=>{
      try{
      const rawMovies=await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
      if(!rawMovies.ok)throw new Error("Error Occured in fetching upcoming movies",err);
      const movies=await rawMovies.json();
      dispatch(addUpcomingMovies
        (movies.results));
      console.log(`Upcoming movies => ${movies}`);
      }catch(err){
        console.log("Error occured in fetching Upcomg movies",err);
        setErr(true);
      }
    }
  
    useEffect(()=>{
        !upcomingMovies && getUpcomingMovies();
      },[])
      return err;
}
export default useUpcomingMovies;