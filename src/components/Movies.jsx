import React, { useEffect, useState } from "react";
import colors from "tailwindcss/colors";
import { Shader, Plasma } from "shaders/react";
import ThinCard from "./ThinCard";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movieData, setMovieData] = useState([]);


  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
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
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-white text-5xl font-bold tracking-tight font-[Inter]">
            Movies
          </h1>
          <p className="text-lg text-neutral-200 mt-4">
            Discover Your Next Favorite Movie
          </p>
          <div className="grid grid-cols-6 mt-10 gap-x-6 gap-y-12">
            {movieData.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <ThinCard
                  className={""}
                  key={movie.id}
                  poster_path={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                  title={movie.title}
                  rating={movie.vote_average.toFixed(1)}
                  year={movie.release_date.slice(0, 4)}
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

export default Movies;
