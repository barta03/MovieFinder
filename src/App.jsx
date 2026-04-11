import { Calendar, Heart, MoonIcon, Search, Star, Sun } from "lucide-react";
import { useState } from "react";

import Suggestion from "./components/Suggestion.jsx";

function App() {
  const [themeDark, setThemeDark] = useState(false);

  const handleThemeChange = (e) => {
    document.documentElement.classList.toggle("dark");
    setThemeDark((prev) => !prev);
  };
  return (
    <>
      <nav className="h-20 w-full flex items-center p-5 my-2">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          <div className="font-semibold text-3xl bg-linear-to-r from-rose-800 via-pink-400 to-rose-800 bg-clip-text text-transparent dark:from-pink-400 dark:via-rose-400 dark:to-pink-400 hover:scale-115 cursor-pointer transition-all duration-500">
            <span className="font-extrabold tracking-tighter">Tuff</span>Movies
          </div>
          <div className="border-2 border-neutral-500 rounded-2xl px-2 py-1 flex items-center justify-between gap-4 dark:border-neutral-200 dark:border">
            <Search className="dark:text-white" />
            <input
              type="search"
              className="flex-1 w-120 font-[Inter] tracking-tight rounded-2xl px-2 py-1 focus:outline-none dark:placeholder:text-neutral-400 dark:text-white "
              placeholder="Search Movies, Series ..."
            />
          </div>
          <div className="flex items-center justify-center gap-10">
            <div className="flex text-slate-800 items-center justify-center gap-6 font-semibold font-[Inter] tracking-wide dark:text-white">
              <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-3 hover:decoration-rose-700 transition-all duration-300 ">
                Home
              </p>
              <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-3 hover:decoration-rose-700 transition-all duration-300">
                {" "}
                Movies
              </p>
              <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-3 hover:decoration-rose-700 transition-all duration-300">
                Series
              </p>
              <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-3 hover:decoration-rose-700 transition-all duration-300">
                Discover
              </p>
              <button
                onClick={handleThemeChange}
                className="cursor-pointer p-2  transition-transform duration-200 "
              >
                {themeDark ? (
                  <Sun className="hover:fill-pink-700 hover:stroke-pink-700 " />
                ) : (
                  <MoonIcon className="hover:fill-pink-700 hover:stroke-pink-700" />
                )}
              </button>
            </div>

            <div className="size-10 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% hover:scale-104 cursor-pointer"></div>
          </div>
        </div>
      </nav>
      <div className="w-full h-[90vh] relative mb-10">
        <div className="bg-linear-to-t from-transparent via-slate-950/70 to-slate-950 w-full h-40 absolute top-0"></div>
        <img
          className="h-full w-full object-cover object-top"
          src="https://image.tmdb.org/t/p/original/kxQiIJ4gVcD3K6o14MJ72p5yRcE.jpg"
          alt=""
        />
        <div className="bg-linear-to-r from-slate-950 via-slate-950/70 to-transparent w-3/5 h-full absolute left-0 inset-y-0"></div>
        <div className="w-1/4 h-3/4 z-10 absolute left-18 bottom-1/2 translate-y-1/2 flex flex-col justify-start gap-5 selection:bg-white selection:text-pink-700">
          <div className="h-1/2 self-start">
            <img
              className="w-full object-cover object-center hover:scale-110 transition-all duration-400"
              src="https://image.tmdb.org/t/p/w500/eRcY1EQ8NCZNnZwTB4KVf19QcsI.png"
              alt=""
            />
          </div>

          <div className="flex justify-between items-center text-neutral-200 text-lg tracking-wide font-bold">
            <div className="flex justify-center items-center gap-2 font-[Inter]">
              <Star />
              <p className="text-neutral-400">6.9/10</p>
            </div>
            <div className="flex justify-center items-center gap-2 font-[Inter]">
              <Calendar />
              <p className="text-neutral-400">2026</p>
            </div>
            <div className="flex justify-center items-center gap-2 font-[Inter]">
              <Heart />
              <p className="text-neutral-400">Family</p>
            </div>
          </div>
          <div className="text-white tracking-wide text-shadow-red-50 text-md leading-7 line-clamp-6 font-light">
            Having thwarted Bowser's previous plot to marry Princess Peach,
            Mario and Luigi now face a fresh threat in Bowser Jr., who is
            determined to liberate his father from captivity and restore the
            family legacy. Alongside companions new and old, the brothers travel
            across the stars to stop the young heir's crusade.
          </div>
        </div>
        <div className="bg-linear-to-t from-black via-black/70 to-transparent w-full h-80 absolute bottom-0"></div>
      </div>
      <Suggestion
        section_name={"Now Playing"}
        url={
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
        }
      />
      <Suggestion
        section_name={"Popular"}
        url={"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"}
      />
      <Suggestion
        section_name={"Top Rated"}
        url={
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
        }
      />
      <Suggestion
        section_name={"Upcoming"}
        url={
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
        }
      />
      <div className="h-40 bg-linear-to-b from-sky-100 via-[#FB04FF]/70 to-[#FB04FF] dark:from-slate-950"></div>
      <div className="h-110 bg-[#FB04FF] flex justify-center items-baseline-last overflow-y-hidden group">
        <div className="relative flex justify-center">
          <div className="absolute w-full left-0 text-lg  -translate-y-18 z-11 text-end text-slate-950">
            © 2026 TuffMovies. This product uses the
            TMDB API but is not endorsed or certified by TMDB.
          </div>
          <div className="absolute -translate-y-[70%] w-200 opacity-100 group-hover:scale-110 group-hover:opacity-0 transition-all duration-500">
            <img
              src="./footer.png"
              className="object-cover object-center -z-1"
              alt=""
            />
          </div>
          <div className="absolute -translate-y-[70%] w-200 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
            <img
              src="./footer2.png"
              className="object-cover object-center -z-1"
              alt=""
            />
          </div>
          <h1 className="font-extrabold text-[1300%] text-center tracking-tighter leading-25 z-10 text-slate-950 text-shadow-lg/30 text-shadow-neutral-700/80 font-[Inter]">
            TUFFMovies
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;

// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
// /9n2tJBplPbgR2ca05hS5CKXwP2c.jpg
