import React, { useEffect, useRef, useState } from "react";
import colors from "tailwindcss/colors";
import { Shader, Plasma } from "shaders/react";
import ThinCard from "./ThinCard";
import { Link } from "react-router-dom";
import { SearchAlert } from "lucide-react";
import { div } from "three/tsl";

const Search = () => {
  const [movieData, setMovieData] = useState([]);
  const [search, setSearch] = useState("");
  const [empty, setEmpty] = useState([]);
  const inputRef = useRef(null);

  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(search);
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        const movieArray = data.results;
        // movieArray.reverse();
        setMovieData(movieArray);
        console.log(movieArray);
      })
      .catch((err) => console.error(err));
  }, [search]);

  useEffect(() => {
    inputRef.current.focus()
    const fetchAllTrending = async () => {
      const [movieData, tvData] = await Promise.all([
        fetch(
          "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
          options,
        ).then((r) => r.json()),
        fetch(
          "https://api.themoviedb.org/3/trending/tv/week?language=en-US",
          options,
        ).then((r) => r.json()),
      ]);

      const combined = [
        ...movieData.results.slice(0, 12),
        ...tvData.results.slice(0, 12),
      ];
      setEmpty(combined);
    };

    fetchAllTrending();
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Shader className="w-full h-full pointer-events-none brightness-100 dark:brightness-80">
          {/* <FlowingGradient
            colorB={colors.slate[950]}
            colorA={colors.pink[600]}
            distortion={2}
            seed={10}
            speed={2}
            colorSpace="oklch"
          /> */}
          <Plasma
            density={2.5}
            speed={4}
            colorB={colors.slate[950]}
            colorA={colors.pink[600]}
            intensity={1.7}
            balance={60}
          />
        </Shader>
      </div>
      <div className="relative min-h-screen w-full selection:bg-white selection:text-pink-600">
        <div className="max-w-7xl mx-auto px-6 py-20 flex justify-center items-center flex-col gap-10">
          <h1 className="text-3xl text-white tracking-tighter font-semibold">
            Find your next PEAK
          </h1>
          <div onClick={() => iconRef.current.focus()} className="bg-white max-w-4xl w-full rounded-full px-6 py-3 flex justify-center items-center gap-3 focus-within:shadow-lg/40 focus-within:ring-2 focus-within:ring-pink-700 focus-within:shadow-white transition-all duration-300">
            <SearchAlert
              onClick={() => iconRef.current.focus()}
              className="text-neutral-700 cursor-pointer"
            />
            <input
              value={search}
              onChange={handleOnChange}
              ref={inputRef}
              placeholder="Search for your favourite movie or show"
              type="search"
              className="w-full placeholder:text-neutral-600 focus:outline-0 caret-pink-700 "
            />
          </div>
          {search === "" && (
            <div className="text-2xl text-neutral-300  font-[Inter]">
              Trending
            </div>
          )}
          <div className="grid grid-cols-6  gap-x-6 gap-y-12">
            {search !== "" &&
              movieData.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <ThinCard
                    className={""}
                    key={movie?.id}
                    poster_path={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                    title={movie?.title}
                    rating={movie?.vote_average?.toFixed(1)}
                    year={movie?.release_date?.slice(0, 4)}
                  />
                </Link>
              ))}
            {search === "" &&
              empty.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <ThinCard
                    className={""}
                    key={movie?.id}
                    poster_path={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                    title={movie?.title}
                    rating={movie?.vote_average?.toFixed(1)}
                    year={movie?.release_date?.slice(0, 4)}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* <div className="mt-100 text-white text-5xl">Movies</div> */}
    </>
  );
};

export default Search;
