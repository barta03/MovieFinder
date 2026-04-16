import { useCallback, useEffect, useRef, useState } from "react";
import colors from "tailwindcss/colors";
import { Shader, Plasma } from "shaders/react";
import ThinCard from "./ThinCard";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false)
  const observer = useRef();
  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const fetchMovies = async () => {
    
    if (loading || !hasMore) return;
    setLoading(true)
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        options,
      );
      const data = await res.json();
      setMovieData((prev) => [...prev, ...data.results]);
      if (page >= data.total_pages) {
        setHasMore(false);
      }
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const lastMovieRef = useCallback(
    (node) => {
      if(loading) return
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMovies();
        }
      },{
        root:null,
        rootMargin: "0px 0px 300px 0px",
        threshold:0
      });
      if (node) observer.current.observe(node);
    },
    [hasMore,loading],
  );

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Shader className="w-full h-full pointer-events-none brightness-100 dark:brightness-80">
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
            {movieData.map((movie, i) => {
              if (i == movieData.length - 1) {
                return (
                  <Link
                    ref={lastMovieRef}
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                  >
                    <ThinCard
                      className={""}
                      key={movie.id}
                      poster_path={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
                      title={movie.title}
                      rating={movie.vote_average.toFixed(1)}
                      year={movie.release_date.slice(0, 4)}
                    />
                  </Link>
                );
              }
              return (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <ThinCard
                    className={""}
                    key={movie.id}
                    poster_path={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
                    title={movie.title}
                    rating={movie.vote_average.toFixed(1)}
                    year={movie.release_date.slice(0, 4)}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* <div className="mt-100 text-white text-5xl">Movies</div> */}
    </>
  );
};

export default Movies;
