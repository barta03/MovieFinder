import { Calendar, Heart, Star } from "lucide-react";
import { useState, useEffect, useLayoutEffect, useRef } from "react";

const Hero = () => {
  const [movieSet, setMovieSet] = useState([]);
  const [index, setIndex] = useState(0);
  const [video, setVideo] = useState("");

  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  let intervalRef = useRef(null);

  const startTimer=()=>{
    intervalRef.current = setInterval(() => {
      setIndex((prev)=> (prev+1)%movieSet.length)
    }, 10000);
  }

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
          const videos = data.results.reverse().find((v)=>v.site=="YouTube" && v.type=='Trailer')
          const trailer_key = videos.key;
          console.log(trailer_key);
          setVideo(`https://www.youtube.com/embed/${trailer_key}`);
        } catch (err) {
          console.log(err);
        }
      };
      fetchTrailer();
    } else{
      setVideo("")
      startTimer()
    }
  };

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

  useEffect(() => {
    if (!movieSet.length) return;
    startTimer()
    return () => clearInterval(intervalRef.current);
  }, [movieSet.length]);

  return (
    <div className="mt-10">
      <div
        onClick={() => handleHeroClick(movieSet[index]?.id)}
        className="w-full h-[90vh] relative bg-slate-950 "
      >
        {video==="" && <div className="bg-linear-to-t from-transparent via-slate-950/70 to-slate-950 w-full h-40 absolute top-0"></div>}

        {video === "" ? (
          <img
            className={`h-full w-full object-cover object-center aspect-video `}
            src={`https://image.tmdb.org/t/p/original${movieSet[index]?.backdrop_path}`}
            alt=""
          />
        ) : (
          <iframe
            className="w-full h-full aspect-video pointer-events-none"
            src={`${video}?t=30s&&autoplay=1&mute=0&controls=0`}
            allow="autoplay; encrypted-media"
          ></iframe>
        )}
        
        <div className={`peer w-1/4 h-3/4 z-10 absolute left-18 bottom-1/2 translate-y-1/2 flex flex-col justify-start gap-5 selection:bg-white selection:text-pink-700 ${video!=="" ?"opacity-0 hover:opacity-100 transition-all duration-1200":"opacity-100 transition-all duration-4000" }`}>
          <div className="h-1/2 self-start flex items-center justify-center">
            <img
              className="w-full object-cover object-center scale-95 hover:scale-110 transition-all duration-500"
              src={`https://image.tmdb.org/t/p/original${movieSet[index]?.logo_path}`}
              alt=""
            />
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
        <div className={`bg-linear-to-r from-slate-950 via-slate-950/70 to-transparent w-3/5 h-full absolute left-0 inset-y-0 ${video!=="" ?"opacity-0 peer-hover:opacity-100 transition-all duration-1200":"opacity-100 transition-all duration-4000" }`}></div>
        {video==="" && <div className="bg-linear-to-t from-black via-black/70 to-transparent w-full h-80 absolute bottom-0"></div>}
      </div>
    </div>
  );
};

export default Hero;
