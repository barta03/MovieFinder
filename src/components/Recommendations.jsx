import React, { useEffect, useState } from "react";
import ThinCard from "./ThinCard";
import { Link } from "react-router-dom";


const Recommendations = ({ movieId,vidType }) => {
  const [recommendations, setRecommendations] = useState([]);


  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  useEffect(() => {
    console.log(movieId);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/${vidType}/${movieId}/recommendations?language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data.results);
      })
      .catch((err) => console.error(err));
  }, [movieId,vidType]);

  return (
    <div className=" mt-10 max-w-7xl mx-auto flex flex-col justify-center gap-8 pb-4">
      <h1 className="text-3xl">You Might Also Like</h1>
      <div className="overflow-x-scroll flex gap-10 [scrollbar-width:none] py-2 px-4">
        {recommendations.map((movie) => (
          <Link key={movie.id} to={`/${vidType}/${movie.id}`} prefetch="intent" className="z-100">

            <ThinCard

              className={""}
              key={movie.id}
              poster_path={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
              title={movie.title}
              rating={movie.vote_average.toFixed(1)}
              year={movie?.first_air_date?.slice(0, 4)}
            />

            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
