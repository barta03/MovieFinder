import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Header from "./components/Header";
import Footer from "./components/Footer";



function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;

// https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
// /9n2tJBplPbgR2ca05hS5CKXwP2c.jpg
