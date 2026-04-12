import Suggestion from "./components/Suggestion.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="bg-linear-to-b from-black to-[#FB04FF] pb-10 ">
        <div
          className="dark:selection:bg-sky-100 selection:bg-slate-950 selection:text-pink-500 bg-sky-100 py-14 
        rounded-[5rem] dark:bg-slate-950"
        >
          <Suggestion
            section_name={"Now Playing"}
            url={
              "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
            }
          />
          <Suggestion
            section_name={"Popular"}
            url={
              "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
            }
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
        </div>
      </div>
      {/* <div className="h-40 bg-linear-to-b from-sky-100 via-[#FB04FF]/70 to-[#FB04FF] dark:from-slate-950"></div> */}
      <Footer/>
      {/* <iframe
        src={"https://bcine.app/embed/movie/550"}
        width={"100%"}
        height={"100%"}
        allowFullScreen
        allow="autoplay; encrypted-media"
        className="border-0 aspect-video"
      ></iframe> */}
    </>
  );
}

export default App;

// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
// /9n2tJBplPbgR2ca05hS5CKXwP2c.jpg
