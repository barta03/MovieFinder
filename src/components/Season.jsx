import { ArrowDown, ArrowDownUp, ChevronDown, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Season = ({ seriesId, seasons = 0 }) => {
  const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const [episodes, setEpisodes] = useState([]);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(null);
  const [overlay, setOverlay] = useState("");
  const [order, setOrder] = useState(false);
  const [selection, setSelection] = useState(false);
  const [overlaySelection, setOverlaySelection] = useState(false);
  const [selectedEmbed, setSelectedEmbed] = useState("bcine");
  const displayeEpisodes = order ? [...episodes].reverse() : episodes;

  const handleEpisodeClick = (episode_number) => {
    setEpisode(episode_number);
    setOverlay();
  };

  useEffect(() => {
    console.log(seasons);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${season}?language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        const results = data.episodes;
        setEpisodes(results);
        // setSeasons();
        console.log(episodes);
      })
      .catch((err) => console.error(err));
  }, [seriesId, season]);
  return (
    <div className="text-3xl mt-10 max-w-7xl mx-auto flex flex-col justify-center gap-8 pb-4">
      <div className="flex justify-between items-center">
        <h1>Episodes</h1>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setOrder((prev) => !prev)}
            className="px-4 py-3 tracking-wider text-sm font-[Inter] font-light text-white bg-white/10 backdrop-blur-md flex justify-center rounded-full items-center ring-1 ring-neutral-400/40 gap-2 cursor-pointer hover:bg-white/20 hover:border-neutral-400  transition-all duration-200"
          >
            <ArrowDownUp
              className={`transform size-5 stroke-1 transition-all duration-200 ${!order ? "rotate-180" : ""}`}
            />
            {order ? "Newest" : "Oldest"}
          </button>
          <div className="relative">
            <button
              onClick={() => setSelection((prev) => !prev)}
              className={`px-8 py-3 tracking-wider text-sm font-[Inter] font-light text-white bg-white/10 backdrop-blur-md flex justify-center rounded-full items-center ring-1 ring-neutral-400/40 gap-2 cursor-pointer hover:bg-white/20 hover:border-neutral-400  transition-all duration-200 appearance-none `}
            >
              <div className="flex gap-1 justify-center items-center">
                Season {season}{" "}
                <ChevronDown
                  className={`transform transition-all duration-200 ${selection ? "rotate-180" : ""}`}
                />
              </div>
            </button>
            {selection && (
              <div className="absolute top-full mt-2 right-0 w-50 border border-neutral-300/30 max-h-70 rounded-xl bg-neutral-900/90 overflow-y-auto flex justify-start items-center flex-col z-50 overscroll-contain py-1 px-1 [scrollbar-width:none] tracking-wider text-sm font-[Inter] font-light text-white backdrop-blur-md gap-1 transition-all duration-200">
                {Array.from({ length: seasons }, (_, i) => (
                  <p
                    onClick={() => {
                      setSeason(i + 1);
                      setSelection(false);
                      console.log(season);
                    }}
                    key={i}
                    className={`shrink-0 py-3 hover:bg-neutral-300/10 w-[98%] rounded-lg px-3 cursor-pointer ${i + 1 === season ? "bg-neutral-300/10" : ""}`}
                  >
                    Season {i + 1}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-scroll flex gap-10 [scrollbar-width:none] py-2 -mx-4 px-4">
        {displayeEpisodes?.map((epi) => (
          <div
            key={epi.id}
            className="flex flex-col justify-center items-center gap-3"
          >
            <div
              onClick={() => handleEpisodeClick(epi.episode_number)}
              className="relative shrink-0 aspect-video w-80 bg-transparent rounded-2xl overflow-hidden hover:scale-105 hover:shadow-xs/40 hover:shadow-white ring-2 ring-neutral-500/40 hover:ring-neutral-400/90 transiton-all duration-300 cursor-pointer"
            >
              <img
                className="h-full w-full object-cover object-center rounded-2xl"
                src={`https://image.tmdb.org/t/p/w500${epi?.still_path}`}
                alt=""
              />
              <div className="absolute top-2 left-2 px-2 py-2 rounded-lg bg-black/60 backdrop-blur-md text-xs font-bold text-white/90">
                EP{epi.episode_number}
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-2">
              <h1 className="text-lg text-neutral-100 tracking-wide line-clamp-1 font-[Inter]">
                {epi.name}
              </h1>
              <p className="text-sm text-neutral-300 tracking-wider line-clamp-2 font-light font-[Inter]">
                {epi.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
      {overlay !== "" && (
        <div
          onDoubleClick={() => setOverlay("")}
          onClick={() => {
            if (overlaySelection) setOverlaySelection(false);
          }}
          className=" backdrop-blur-2xl h-screen w-screen fixed inset-0 z-500 flex items-center justify-center"
        >
          <div className="absolute top-10 w-50">
            <div className="px-4 py-5 tracking-wider text-sm font-[Inter] font-light text-white bg-white/10 backdrop-blur-md flex justify-center rounded-full items-center ring-1 ring-neutral-400/40 gap-2 cursor-pointer hover:bg-white/20 hover:border-neutral-400  transition-all duration-200 relative">
              <div
                onClick={() => setOverlaySelection((prev) => !prev)}
                className="absolute w-full h-full text-center flex items-center justify-center"
              >
                {selectedEmbed}
              </div>
              {overlaySelection && (
                <div className="absolute top-full mt-2 right-0 w-50 border border-neutral-300/30 max-h-70 rounded-xl bg-neutral-900/90 overflow-y-auto flex justify-start items-center flex-col z-50 overscroll-contain py-1 px-1 [scrollbar-width:none] tracking-wider text-sm font-[Inter] font-light text-white backdrop-blur-md gap-1 transition-all duration-200">
                  <p
                    onClick={() => {
                      setOverlaySelection(false);
                      setSelectedEmbed("bcine");
                    }}
                    className={`shrink-0 py-3 hover:bg-neutral-300/10 w-[98%] rounded-lg px-3 cursor-pointer `}
                  >
                    bcine
                  </p>
                  <p
                    onClick={() => {
                      setOverlaySelection(false);
                      setSelectedEmbed("111movies");
                    }}
                    className={`shrink-0 py-3 hover:bg-neutral-300/10 w-[98%] rounded-lg px-3 cursor-pointer `}
                  >
                    111movies
                  </p>
                  <p
                    onClick={() => {
                      setOverlaySelection(false);
                      setSelectedEmbed("67movies");
                    }}
                    className={`shrink-0 py-3 hover:bg-neutral-300/10 w-[98%] rounded-lg px-3 cursor-pointer `}
                  >
                    67movies
                  </p>
                  <p
                    onClick={() => {
                      setOverlaySelection(false);
                      setSelectedEmbed("2embed.cc");
                    }}
                    className={`shrink-0 py-3 hover:bg-neutral-300/10 w-[98%] rounded-lg px-3 cursor-pointer `}
                  >
                    2embed.cc
                  </p>
                  <p
                    onClick={() => {
                      setOverlaySelection(false);
                      setSelectedEmbed("2embed.online");
                    }}
                    className={`shrink-0 py-3 hover:bg-neutral-300/10 w-[98%] rounded-lg px-3 cursor-pointer `}
                  >
                    2embed.online
                  </p>
                  <p
                    onClick={() => {
                      setOverlaySelection(false);
                      setSelectedEmbed("VidKing");
                    }}
                    className={`shrink-0 py-3 hover:bg-neutral-300/10 w-[98%] rounded-lg px-3 cursor-pointer `}
                  >
                    VidKing
                  </p>
                  <p
                    onClick={() => {
                      setOverlaySelection(false);
                      setSelectedEmbed("CineSrc")
                    }}
                    className={`shrink-0 py-3 hover:bg-neutral-300/10 w-[98%] rounded-lg px-3 cursor-pointer `}
                  >
                    CineSrc
                  </p>
                  <p
                    onClick={() => {
                      setOverlaySelection(false);
                      setSelectedEmbed("Cinezo")
                    }}
                    className={`shrink-0 py-3 hover:bg-neutral-300/10 w-[98%] rounded-lg px-3 cursor-pointer `}
                  >
                    Cinezo 
                  </p>
                </div>
              )}
            </div>
          </div>
          <X
            onClick={() => {
              setOverlay("");
              setEpisode(null);
            }}
            className="text-white size-10 absolute top-10 right-20 stroke-3 fill-white cursor-pointer"
          />
          <div className="w-[90%] flex items-center justify-center rounded-3xl overflow-hidden mx-auto">
            {selectedEmbed == "bcine" && (
              <iframe
                src={`https://bcine.app/embed/tv/${seriesId}/${season}/${episode}`}
                width="100%"
                height="100%"
                allowFullScreen
                allow="autoplay; encrypted-media"
                className="border-2 aspect-video border-neutral-500/50 rounded-3xl mt-8"
              ></iframe>
            )}
            {selectedEmbed == "111movies" && (
              <iframe
                src={`https://111movies.net/tv/${seriesId}/${season}/${episode}`}
                width="100%"
                height="100%"
                allowFullScreen
                allow="autoplay; encrypted-media"
                className="border-2 aspect-video border-neutral-500/50 rounded-3xl mt-8"
              ></iframe>
            )}
            {selectedEmbed == "67movies" && (
              <iframe
                src={`https://67movies.nl/tv/${seriesId}/${season}/${episode}`}
                width="100%"
                height="100%"
                allowFullScreen
                allow="autoplay; encrypted-media"
                className="border-2 aspect-video border-neutral-500/50 rounded-3xl mt-8"
              ></iframe>
            )}
            {selectedEmbed == "2embed.cc" && (
              <iframe
                src={`https://www.2embed.cc/embedtv/${seriesId}&s=${season}&e=${episode}`}
                width="100%"
                height="100%"
                allowFullScreen
                allow="autoplay; encrypted-media"
                className="border-2 aspect-video border-neutral-500/50 rounded-3xl mt-8"
              ></iframe>
            )}
            {selectedEmbed == "CineSrc" && (
              <iframe
                src={`https://cinesrc.st/embed/tv/${seriesId}?s=${season}&e=${episode}`}
                width="100%"
                height="100%"
                allowFullScreen
                allow="autoplay; encrypted-media"
                className="border-2 aspect-video border-neutral-500/50 rounded-3xl mt-8"
              ></iframe>
            )}
            {selectedEmbed == "VidKing" && (
              <iframe
                src={`https://www.vidking.net/embed/tv/${seriesId}/${season}/${episode}?autoPlay=true&nextEpisode=true&episodeSelector=true`}
                width="100%"
                height="100%"
                allowFullScreen
                allow="autoplay; encrypted-media"
                className="border-2 aspect-video border-neutral-500/50 rounded-3xl mt-8"
              ></iframe>
            )}
            {selectedEmbed == "Cinezo" && (
              <iframe
                src={`https://api.cinezo.net/tv/${seriesId}/${season}/${episode}`}
                width="100%"
                height="100%"
                allowFullScreen
                allow="autoplay; encrypted-media"
                className="border-2 aspect-video border-neutral-500/50 rounded-3xl mt-8"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Season;
