import React, { act, useEffect, useState } from "react";

const Cast = ({ movieId, vidType }) => {
  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const [cast, setCast] = useState([]);

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
      `https://api.themoviedb.org/3/${vidType}/${movieId}/credits?language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        setCast(data.cast);
      })
      .catch((err) => console.error(err));
  }, [movieId]);
  return (
    <div className="text-3xl mt-10 max-w-7xl mx-auto flex flex-col justify-center gap-8 ">
      <p>Cast</p>
      <div className="overflow-x-scroll flex gap-10 [scrollbar-width:none] py-2 px-4">
        {cast?.slice(0, 15).map((actor) => (
          <div key={actor.id} className="flex flex-col justify-start items-center gap-4 transition-all duration-300">
            <div
              
              className="shrink-0 size-30 rounded-full hover:rounded-3xl transition-all duration-300 group overflow-hidden cursor-pointer hover:scale-120"
            >
              <img
                loading="lazy"
                className="object-cover object-center size-30 rounded-3xl group-hover:scale-90 transition-all duration-300"
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                alt=""
              />
            </div>
            <div className="text-sm flex flex-col items-center jtc gap-1 text-center text-pretty">
              {actor.name}
              <p className="text-sm font-extralight text-neutral-300 text-center text-pretty">
                {actor.character}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Cast;
