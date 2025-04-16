import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, OPENAI_KEY } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";
import Error from "./Error";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchTMDBMovie = async (movieName) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGPTSearch = async () => {
    const prompt = `Act as a Movie Recommendation system and suggest some movies for the query: ${searchText.current.value}. 
      Only give me names of 5 movies, comma separated. Example: Gadar, Koi mil Gaya, Golmaal, Mai Khiladi tu Anari, Jeene Nahi Dunga`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${OPENAI_KEY}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(text);
      const gptMovies = text.split(",").map((movie) => movie.trim());
      const promiseArray = gptMovies.map((movie) => searchTMDBMovie(movie));
      const tmdbResults = await Promise.all(promiseArray);

      if (!tmdbResults) return <Error />;
      dispatch(
        addGptMovieResults({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (err) {
      console.error("Gemini Error:", err);
    }
  };

  return (
    <div className=" pt-[35%] md:pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          className=" p-2 m-2 md:p-4 md:m-4 col-span-9 rounded-lg"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGPTSearch}
          className=" col-span-3 m-2 p-2 md:py-2 md:px-4 md:m-4 rounded-lg bg-red-800 text-white"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
