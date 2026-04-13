import { Star } from "lucide-react";

const ThinCard = ({ poster_path, title, rating, year, className }) => {
  return (
    <div
      className={`h-72 w-48 shrink-0 hover:scale-105 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:z-100 shadow-xl/20 dark:shadow-neutral-500 hover:shadow-xl/40 hover:shadow-pink-700 dark:hover:shadow-pink-400 relative border dark:border-neutral-300/30 border-neutral-600/40 ${className}`}
    >
      <div className="absolute h-full w-full bg-transparent hover:bg-black/50 font-[Inter] flex justify-center items-center  opacity-0 hover:opacity-100 duration-300 transition-all">
        <div className="flex justify-center items-center flex-col gap-2 w-1/2">
          <button className="px-6 py-1 bg-neutral-200 text-neutral-900 rounded-2xl font-semibold cursor-pointer mb-2">
            Info
          </button>
          <p className="text-white font-semibold text-sm text-pretty text-center">
            {title}
          </p>
          <div className="flex justify-center items-center gap-3 text-xs w-full font-semibold text-neutral-300">
            <p>{year}</p>
            <p className="flex gap-1 items-center justify-center">
              <span>
                <Star className="size-3 fill-yellow-400 stroke-yellow-400" />
              </span>
              {rating}
            </p>
          </div>
        </div>
      </div>

      <img
        className="h-full w-full object-cover object-center"
        src={poster_path}
        alt=""
        loading="lazy"
      />
    </div>
  );
};

export default ThinCard;
