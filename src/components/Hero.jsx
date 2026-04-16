import { Calendar, Heart, Star } from "lucide-react";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [movieSet, setMovieSet] = useState([]);
  const [index, setIndex] = useState(0);
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  let intervalRef = useRef(null);

  const startTimer = () => {
    let start = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = (elapsed / 10000) * 100;

      if (percent >= 100) {
        setIndex((prev) => (prev + 1) % movieSet.length);
        start = Date.now(); // reset timer
        setProgress(0);
        start = Date.now();
      } else {
        setProgress(percent);
      }
    }, 50);
  };

  const handleHeroClick = (id) => {
    console.log(id);
    clearInterval(intervalRef.current);
    if (video === "") {
      const fetchTrailer = async () => {
        try {
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          };
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            options,
          );
          const data = await res.json();
          console.log(data);
          const videos = data.results
            .reverse()
            .find((v) => v.site == "YouTube" && v.type == "Trailer");
          const trailer_key = videos.key;
          console.log(trailer_key);
          setVideo(`https://www.youtube.com/embed/${trailer_key}`);
        } catch (err) {
          console.log(err);
        }
      };
      fetchTrailer();
    } else {
      setVideo("");
      startTimer();
      setProgress(0);
    }
  };
  useEffect(() => {
  setImageLoaded(false);
}, [index]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        };
        const res = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          options,
        );
        const data = await res.json();
        const movieArray = data.results.slice(0, 5);
        movieArray.reverse();

        const moviesWithLogos = await Promise.all(
          movieArray.map(async (movie) => {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/images`,
              options,
            );
            const data = await res.json();

            const logo = data.logos.find((l) => l.iso_639_1 === "en");

            return {
              ...movie,
              logo_path: logo?.file_path || "/7Uqhv24pGJs4Ns31NoOPWFJGWNG.png",
            };
          }),
        );
        setMovieSet(moviesWithLogos);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, []);

  const backdrop = movieSet[index]?.backdrop_path;

  const lowQuality = backdrop
    ? `https://image.tmdb.org/t/p/w300${backdrop}`
    : "";

  const highQuality = backdrop
    ? `https://image.tmdb.org/t/p/original${backdrop}`
    : "";


  useEffect(() => {
    if (!movieSet.length) return;
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [movieSet.length]);

  return (
    <div>
      <div
        onClick={() => {
          if (video) {
            clearInterval(intervalRef.current);
            setVideo("");
            setProgress(0);
            startTimer();
          }
          handleHeroClick(movieSet[index]?.id);
        }}
        className="w-full h-[90vh] relative bg-slate-950 "
      >
        {video === "" && (
          <div className="bg-linear-to-t from-transparent via-slate-950/70 to-slate-950 w-full h-40 absolute top-0"></div>
        )}
        {video === "" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute text-white tex-lg top-1/2 -translate-y-1/2 right-8 flex flex-col items-center justify-center gap-2 bg-black/10 backdrop-blur-xl py-2 px-2 rounded-full rotate-180 ring-1 ring-neutral-200/20"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  clearInterval(intervalRef.current);

                  setIndex(i);
                  startTimer();
                  setProgress(0);
                }}
                className={`bg-neutral-300/60 ${index == i ? "h-8 " : "h-3"} inset-shadow-2xs inset-shadow-white hover:bg-neutral-300 w-3 z-1000 rounded-full cursor-pointer transition-all duration-500 overflow-hidden `}
              >
                <div
                  className="w-full bg-white transition-all duration-100 ease-linear rounded-full shadow-md/50 shadow-black"
                  style={{
                    height: index === i ? `${progress}%` : "0%",
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}
        {video === "" ? (
          <div className="relative h-full w-full">
            <img
              onClick={() => handleHeroClick(movieSet[index]?.id)}
              className={`h-full w-full object-cover object-center aspect-video`}
              src={`https://image.tmdb.org/t/p/original${movieSet[index]?.backdrop_path}`}
              alt=""
            />
          </div>
        ) : (
          <iframe
            className="w-full h-full aspect-video pointer-events-none"
            src={`${video}?t=30s&&autoplay=1&mute=0&controls=0`}
            allow="autoplay; encrypted-media"
          ></iframe>
        )}

        <div
          onClick={(e) => e.stopPropagation()}
          className={`peer w-1/4 h-3/4 z-10 absolute left-18 bottom-1/2 translate-y-1/2 flex flex-col justify-start gap-5 selection:bg-white selection:text-pink-700 ${video !== "" ? "opacity-0 hover:opacity-100 transition-all duration-4000" : "opacity-100 transition-all duration-4000"}`}
        >
          <div className="h-1/2 self-start flex items-center justify-center">
            <Link
              key={movieSet[index]?.id}
              to={`/movie/${movieSet[index]?.id}`}
            >
              <img
                className="w-full object-cover object-center scale-95 hover:scale-110 transition-all duration-500"
                src={`https://image.tmdb.org/t/p/w500${movieSet[index]?.logo_path}`}
                alt=""
              />
            </Link>
          </div>

          <div className="flex justify-between items-center text-neutral-200 text-lg tracking-wide font-bold">
            <div className="flex justify-center items-center gap-2 font-[Inter]">
              <Star />
              <p className="text-neutral-400">
                {movieSet[index]?.vote_average.toFixed(1)}
              </p>
            </div>
            <div className="flex justify-center items-center gap-2 font-[Inter]">
              <Calendar />
              <p className="text-neutral-400">
                {movieSet[index]?.release_date.slice(0, 4)}
              </p>
            </div>
            <div className="flex justify-center items-center gap-2 font-[Inter]">
              <Heart />
              <p className="text-neutral-400">Family</p>
            </div>
          </div>
          <div className="text-white tracking-wide text-shadow-red-50 text-md leading-7 line-clamp-6 font-light ">
            {movieSet[index]?.overview}
          </div>
        </div>
        <div
          className={`bg-linear-to-r from-slate-950 via-slate-950/70 to-transparent w-3/5 h-full absolute left-0 inset-y-0 ${video !== "" ? "opacity-0 peer-hover:opacity-100 transition-all duration-1200" : "opacity-100 transition-all duration-4000"}`}
        ></div>
        {video === "" && (
          <div className="bg-linear-to-t from-black via-black/70 to-transparent w-full h-80 absolute bottom-0"></div>
        )}
      </div>
    </div>
  );
};

export default Hero;
