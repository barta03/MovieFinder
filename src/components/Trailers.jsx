import { Cross, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Trailers = ({ movieId,vidType }) => {
  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const [trailers, setTrailers] = useState([]);
  const [overlay, setOverlay] = useState("");

  const handleTrailerClick = (key) => {
    // if (setOverlay == "") {
    //   setOverlay("");
    //   console.log(overlay);
    // } else {
      setOverlay(`https://www.youtube.com/embed/${key}`);
      console.log(overlay);
    // }
    // return;
  };

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
      `https://api.themoviedb.org/3/${vidType}/${movieId}/videos?language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        const final = results.filter(
          (vid) =>
            vid.type === "Trailer" &&
            vid.site === "YouTube" &&
            vid.iso_639_1 === "en",
        );
        setTrailers(final);
      })
      .catch((err) => console.error(err));
  }, [movieId]);
  return (
    <div className="text-3xl mt-10 max-w-7xl mx-auto flex flex-col justify-center gap-8 ">
      <h1>Trailers</h1>
      <div className="overflow-x-scroll flex gap-10 [scrollbar-width:none] py-2 -mx-4 px-4">
        {trailers.map((trailer) => (
          <div
            key={trailer.id}
            onClick={() => handleTrailerClick(trailer.key)}
            className="relative shrink-0 aspect-video w-80 bg-transparent rounded-2xl overflow-hidden hover:scale-105 hover:shadow-xs/40 hover:shadow-white ring-2 ring-neutral-500/40 hover:ring-neutral-400/90 transiton-all duration-300 cursor-pointer"
          >
            <img
              className="h-full w-full object-cover object-center rounded-2xl"
              src={`https://img.youtube.com/vi/${trailer.key}/sddefault.jpg`}
              alt=""
            />
          </div>
        ))}
      </div>
      {overlay !== "" && (
        <div
          onClick={() => setOverlay("")}
          className=" backdrop-blur-2xl h-screen w-screen fixed inset-0 z-500 flex items-center justify-center"
        >
          <X className="text-white size-10 absolute top-10 right-20 stroke-3 fill-white cursor-pointer "/>
          <div className="w-full flex items-center justify-center rounded-3xl overflow-hidden">
            <iframe
              className="w-3/4 aspect-video z-200 rounded-3xl"
              src={`${overlay}?autoplay=1`}
              allow="autoplay; encrypted-media"
              title="Trailer"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trailers;
