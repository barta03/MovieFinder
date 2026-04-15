import { CircleSmall, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cast from "./Cast";
import Trailers from "./Trailers";
import Recommendations from "./Recommendations";

const MovieInfo = () => {
  const { seriesId } = useParams();
  const [seriesDetail, setSeriesDetail] = useState({});
  const [readMore, setReadMore] = useState(false);
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
      `https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((data) => setSeriesDetail(data))
      .catch((err) => console.error(err));

    fetch(`https://api.themoviedb.org/3/tv/${seriesId}/images`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const logo = data.logos.find((l) => l.iso_639_1 === "en");
        setSeriesDetail((prev) => ({
          ...prev,
          logo_path: logo?.file_path || "/7Uqhv24pGJs4Ns31NoOPWFJGWNG.png",
        }));
      })
      .catch((err) => console.error(err));
  }, [seriesId]);
  return (
    <>
      <div className=" bg-slate-950 fixed inset-0 -z-10 pointer-events-none"></div>
      <div className="relative min-h-screen text-white -mt-18 pb-30">
        {/* <div>{movieId}</div> */}
        <div className="relative">
          <div className="h-[75] relative">
            <div className="absolute inset-x-0 -bottom-4 bg-linear-to-t from-slate-950 via-slate-950 to-transparent h-30"></div>
            <div className="absolute inset-y-0 left-0 bg-radial-[at_15%_98%] from-20% via-60% from-slate-950 via-transparent to-transparent w-160"></div>
            <img
              className="object-conver object-top"
              src={`https://image.tmdb.org/t/p/original${seriesDetail?.backdrop_path}`}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="absolute left-16 bottom-0 flex flex-col  gap-8">
            <div className="w-150 flex flex-col justify-center items-center gap-6">
              <div className="h-[60] flex justify-start items-center w-full">
                <img
                  loading="lazy"
                  className="object-cover object-bottom-left w-120 "
                  src={`https://image.tmdb.org/t/p/original${seriesDetail?.logo_path}`}
                  alt=""
                />
              </div>
              <div className="flex w-full justify-start items-center gap-3 text-lg tracking-tighter text-neutral-200">
                {seriesDetail?.genres
                  ?.slice(
                    0,
                    seriesDetail.genres.length < 3
                      ? seriesDetail.genres.length
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
            </div>
            <div className="min-w-120 rounded-xl bg-white/4 border border-white/6  backdrop-blur-sm px-6 py-3">
              <div className="flex justify-start items-center gap-4 text-neutral-300">
                <p>{seriesDetail?.first_air_date?.slice(0, 4) || "2023"}-{seriesDetail?.status=="Ended"? seriesDetail?.last_air_date?.slice(0, 4):""}</p>
                <p>
                  {seriesDetail.status}
                </p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="fill-yellow-400 stroke-0 size-5" />
                  <p>{seriesDetail?.vote_average?.toFixed(1) || 5}</p>
                </div>
              </div>
              <div
                className={`max-w-md font-light mt-4 line-clamp-3 ${!readMore ? "line-clamp-3" : "line-clamp-10"}`}
              >
                <p>{seriesDetail.overview}</p>
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
          <Cast vidType={"tv"} movieId = {seriesId} />
        </div>
        <div>
          <Trailers vidType={"tv"} movieId = {seriesId}/>
        </div>
        <div>
          <Recommendations vidType={"tv"} movieId = {seriesId}/> 
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
