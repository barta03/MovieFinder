import { CircleSmall, Play, Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cast from "./Cast";
import Trailers from "./Trailers";
import Recommendations from "./Recommendations";

const MovieInfo = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [readMore, setReadMore] = useState(false);
  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const [overlay, setOverlay] = useState("");

  const handleTrailerClick = () => {
    // if (setOverlay == "") {
    //   setOverlay("");
    //   console.log(overlay);
    // } else {
    setOverlay(`https://bcine.app/embed/movie/${movieId}`);
    console.log(overlay);
    // }
    // return;
  };

  useEffect(() => {
    // window.scrollTo(0,0)
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((data) => setMovieDetail(data))
      .catch((err) => console.error(err));

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const logo = data.logos.find((l) => l.iso_639_1 === "en");
        setMovieDetail((prev) => ({
          ...prev,
          logo_path: logo?.file_path || "/7Uqhv24pGJs4Ns31NoOPWFJGWNG.png",
        }));
      })
      .catch((err) => console.error(err));
  }, [movieId]);
  return (
    <>
      <div className=" bg-slate-950 fixed inset-0 -z-10 pointer-events-none"></div>
      {overlay !== "" && (
        <div
          onDoubleClick={() => setOverlay("")}
          className=" backdrop-blur-2xl h-screen w-screen fixed inset-0 z-500 flex items-center justify-center"
        >
          <X onClick={() => setOverlay("")} className="text-white size-10 absolute top-10 right-20 stroke-3 fill-white cursor-pointer " />
          <div className="w-[90%] flex items-center justify-center rounded-3xl overflow-hidden" mx-auto>
            <iframe
              src={`https://bcine.app/embed/movie/${movieId}`}
              width="100%"
              height="100%"
              allowFullScreen
              allow="autoplay; encrypted-media"
              className="border-0 aspect-video"
            ></iframe>
          </div>
        </div>
      )}
      <div className="relative min-h-screen text-white -mt-18 pb-30">
        {/* <div>{movieId}</div> */}
        <div className="relative">
          <div className="h-[75] relative">
            <div className="absolute inset-x-0 -bottom-4 bg-linear-to-t from-slate-950 via-slate-950 to-transparent h-30"></div>
            <div className="absolute inset-y-0 left-0 bg-radial-[at_15%_98%] from-20% via-60% from-slate-950 via-transparent to-transparent w-160"></div>
            <img
              className="object-conver object-top"
              src={`https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path}`}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="absolute left-16 bottom-0 flex flex-col gap-8">
            <div className="w-150 flex flex-col justify-center items-center gap-6">
              <div className="h-[60] flex justify-start items-center w-full">
                <img
                  loading="lazy"
                  className="object-cover object-bottom-left w-120 "
                  src={`https://image.tmdb.org/t/p/original${movieDetail?.logo_path}`}
                  alt=""
                />
              </div>
              <div className="flex w-full justify-start items-center gap-3 text-lg tracking-tighter text-neutral-200">
                {movieDetail?.genres
                  ?.slice(
                    0,
                    movieDetail.genres.length < 3
                      ? movieDetail.genres.length
                      : 3,
                  )
                  .map((genre, i, arr) => (
                    <React.Fragment key={genre.id}>
                      <div>{genre.name}</div>
                      {i < arr.length - 1 ? (
                        <CircleSmall className="stroke-0 fill-neutral-200 size-4" />
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  ))}
              </div>
              {/* <Link className="self-start" to={`/movie/${movieId}/watch`}> */}
              <button
                onClick={() => handleTrailerClick()}
                className="px-6 py-3 bg-neutral-200 text-neutral-900 rounded-2xl font-semibold cursor-pointer mb-2 flex justify-center items-center gap-2 text-lg self-start"
              >
                <Play className="text-black fill-black" />
                Play
              </button>
              {/* </Link> */}
            </div>
            <div className="min-w-120 rounded-xl bg-white/4 border border-white/6  backdrop-blur-sm px-6 py-3">
              <div className="flex justify-start items-center gap-4 text-neutral-300">
                <p>{movieDetail?.release_date?.slice(0, 4) || "2023"}</p>
                <p>
                  {(movieDetail?.runtime / 60)?.toFixed(0) || 2}h{" "}
                  {movieDetail.runtime % 60}m
                </p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="fill-yellow-400 stroke-0 size-5" />
                  <p>{movieDetail?.vote_average?.toFixed(1) || 5}</p>
                </div>
              </div>
              <div
                className={`max-w-md font-light mt-4 line-clamp-3 ${!readMore ? "line-clamp-3" : "line-clamp-10"}`}
              >
                <p>{movieDetail.overview}</p>
              </div>
              <div
                className="text-zinc-400 mt-2 cursor-pointer"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read Less" : "Read More"}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Cast vidType={"movie"} movieId={movieId} />
        </div>
        <div>
          <Trailers vidType={"movie"} movieId={movieId} />
        </div>
        <div>
          <Recommendations vidType={"movie"} movieId={movieId} />
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
