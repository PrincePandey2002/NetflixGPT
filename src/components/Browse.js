import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../customHooks/usePopularMovies";
import useTopRatedMovies from "../customHooks/useTopRatedMovies";
import useUpcomingMovies from "../customHooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import Error from "./Error";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const errNowPlaying=useNowPlayingMovies();
  const errPopular=usePopularMovies();
  const errTopRated=useTopRatedMovies();
  const errUpcoming=useUpcomingMovies();
  if(errNowPlaying) return <Error/>
  if(errPopular)return <Error/>
  if(errTopRated) return <Error/>
  if(errUpcoming)return <Error/>
  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
