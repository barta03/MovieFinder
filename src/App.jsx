import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieInfo from "./components/MovieInfo";
import SeriesInfo from "./components/SeriesInfo";
import { useLayoutEffect } from "react";
import MovieWatch from "./components/MovieWatch";
import Search from "./components/Search";


// import SeriesWatch from "./components/SeriesWatch";

function App() {
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };
  const MainLayout = () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );

  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/movie" element={<Movies />} />
              <Route path="/movie/:movieId" element={<MovieInfo />} />

              <Route path="/tv" element={<Series />} />
              <Route path="/tv/:seriesId" element={<SeriesInfo />} />
              <Route path="/search" element={<Search />} />

            </Route>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;

// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
// /9n2tJBplPbgR2ca05hS5CKXwP2c.jpg
