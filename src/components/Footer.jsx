
const Footer = () => {
  return (
    <div className="bg-[#FB04FF] absolute bottom-0 w-full">
      <div className="h-120 bg-[#FB04FF] flex justify-center items-baseline-last overflow-y-hidden group rounded-t-4xl ">
        <div className="relative flex justify-center">
          <div className="absolute w-full left-0 text-lg -translate-y-18 z-11 text-end text-slate-950">
            © 2026 TuffMovies. This product uses the TMDB API but is not endorsed
            or certified by TMDB.
          </div>
          <div className="absolute -translate-y-[70%] w-200 opacity-100 group-hover:scale-110 group-hover:opacity-0 transition-all duration-1500">
            <img
              src="./footer.png"
              className="object-cover object-center -z-1"
              alt=""
            />
          </div>
          <div className="absolute -translate-y-[70%] w-200 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1500">
            <img
              src="./footer2.png"
              className="object-cover object-center -z-1"
              alt=""
            />
          </div>
          <h1 className="font-extrabold text-[1300%] text-center tracking-tighter leading-25 z-10 text-slate-950 text-shadow-lg/30 text-shadow-neutral-700/80 font-[Inter] perspective-distant transform-3d block">
            <span className="group-hover:text-blue-950 text-transparent  transition-all duration-1500 inline-block">
              TUFFMovies
            </span>
          </h1>
      
        </div>
      </div>
    </div>
  );
};

export default Footer;
