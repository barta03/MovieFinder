import React, { useEffect, useState } from "react";
import colors from "tailwindcss/colors";
import { Shader, Plasma } from "shaders/react";
import ThinCard from "./ThinCard";
import { Link } from "react-router-dom";

const Series = () => {
  const [seriesData, setSeriesData] = useState([]);

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
      "https://api.themoviedb.org/3/discover/tv",
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        const seriesArray = data.results;
        // seriesArray.reverse();
        setSeriesData(seriesArray);
        console.log(seriesArray);
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
            speed={10}
            colorB={colors.slate[950]}
            colorA={colors.pink[600]}
            intensity={1.7}
            balance={60}
          />
        </Shader>
      </div>
      <div className="relative min-h-screen w-full  selection:bg-white selection:text-pink-600">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-white text-5xl font-bold tracking-tight font-[Inter]">
            Series
          </h1>
          <p className="text-lg text-neutral-200 mt-4">
            Discover Your Next Favorite Series
          </p>
          <div className="grid grid-cols-6 mt-10 gap-x-6 gap-y-12">
            {seriesData.map((series) => (
              <Link key={series.id} to={`/tv/${series.id}`}>
                <ThinCard
                  className={""}
                  key={series.id}
                  poster_path={`https://image.tmdb.org/t/p/original${series?.poster_path}`}
                  title={series.title}
                  rating={series.vote_average.toFixed(1)}
                  year={series.first_air_date.slice(0, 4)}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="mt-100 text-white text-5xl">seriess</div> */}
    </>
  );
};

export default Series;
