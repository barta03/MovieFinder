import { ArrowRight } from "lucide-react";
import Card from "./Card.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThinCard from "./ThinCard.jsx";

const Suggestion = ({section_name,url}) => {
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
      url,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        const movieArray = data.results;
        movieArray.reverse();
        setMovieData(movieArray)
        // console.log(movieArray);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl text-shadow-black font-extrabold tracking-wide font-[Inter] dark:text-white">
          {section_name}
        </h1>
        <p className="font-[Inter] flex gap-2 font-semibold text-neutral-700 dark:text-neutral-200 cursor-pointer group scale-90 hover:scale-95 transition-all duration-200">
          View All{" "}
          <span>
            <ArrowRight className="stroke-2 group-hover:translate-x-1 transition-all duration-200 " />
          </span>
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r  from-sky-100 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute -right-2 top-0 h-full w-20 bg-linear-to-l from-sky-100 blur-xs dark:from-slate-950  to-transparent z-10 pointer-events-none"></div>
        <div className="relative flex justify-start items-center mt-4 gap-3 overflow-x-auto [scrollbar-width:none] pt-5 pb-16 snap-x snap-mandatory scroll-smooth">
          {movieData.map((movie,i) => {
            let l=""
            if(i===0){
              l="hover:ml-4"
            }else if(i===19){
              l='hover:mr-4'
            }
            return (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <ThinCard
                  className={l}
                  key={movie.id}
                  poster_path={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  title={movie.title}
                  rating={movie.vote_average.toFixed(1)}
                  year={movie.release_date.slice(0,4)}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
