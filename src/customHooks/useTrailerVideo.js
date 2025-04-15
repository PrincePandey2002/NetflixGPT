import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import Error from "../components/Error";

const useTrailerVideo = (movieId) => {
  const [err,setErr]=useState(false);
  const dispatch = useDispatch();
  const trailerVideo=useSelector(store=>store.movies.trailerVideo);
  const getTrailer = async () => {
    try{

        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        if(!data)return <Error/>
        const json = await data.json();
        // console.log(json);
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        // console.log(trailer);
        dispatch(addTrailerVideo(trailer));
    }
    catch(err){
      console.log("Error Ocuured in fetching trailer");
      setErr(false);
    }
  };

  useEffect(() => {
    !trailerVideo && getTrailer();
  }, []);
  return err;
};

export default useTrailerVideo;
