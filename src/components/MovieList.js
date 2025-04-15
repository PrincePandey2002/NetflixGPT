import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // console.log(movies);
  return (
    <div className="px-6 text-white">
        <h1 className=" text-lg md:text-3xl py-4">{title}</h1>

      <div className="flex overflow-x-scroll scrollbar-none">
        <div className="flex">
          {movies?.map((movie) => 
            <MovieCard key={movie.id} posterCard={movie.poster_path} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
