import {  MoonIcon, Search, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="dark:selection:bg-sky-100 max-w-2xl mx-auto h-fit selection:bg-slate-950 selection:text-pink-500 bg-transparent sticky top-4 z-200 flex justify-center rounded-full ">
      <Header2 />
    </div>
  );
};

export default Header;

const Header2 = () => {
  const [themeDark, setThemeDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setThemeDark(true);
    }
  }, []);

  const handleThemeChange = (e) => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setThemeDark(isDark);
  };
  return (
    <div className="w-full max-w-2xl mx-auto h-16 rounded-full pl-2 py-2 bg-[#14141466] backdrop-blur-[30px] backdrop-saturate-150 z-20 border border-white/10 shadow-[0_10px_40px_#0003] transition-colors duration-300 text-white">
      <div className="h-full flex justify-between items-center px-4">
        <div
          className="font-regular text-xl bg-linear-to-r bg-clip-text text-transparent from-pink-400 via-rose-400 to-pink-400 hover:scale-105 cursor-pointer
            transition-all duration-500"
        >
          <Link to={"/"}><span className="font-extrabold tracking-tighter">T</span>Movies</Link>
        </div>
        <div className="flex items-center justify-center gap-3 cursor-pointer ">
          <NavLink
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-white  scale-110" : "text-neutral-400 hover:text-shadow-md/70 hover:text-shadow-pink-700 hover:scale-105 transition-all duration-300"}`
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-white  scale-110" : "text-neutral-400 hover:text-shadow-md/70 hover:text-shadow-pink-700 hover:scale-105 transition-all duration-300"}`
            }
            to={"/movies"}
          >
            Movie
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-lg ${isActive ? "ttext-white  scale-110" : "text-neutral-400 hover:text-shadow-md/70 hover:text-shadow-pink-700 hover:scale-105 transition-all duration-300"}`
            }
            to={"/series"}
          >
            Series
          </NavLink>
          <Search className="mx-3" />
        </div>
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handleThemeChange}
            className="cursor-pointer p-2  transition-transform duration-200 hover:-rotate-12 active:rotate-40 "
          >
            {themeDark ? (
              <Sun className="hover:fill-pink-700 hover:stroke-pink-700 " />
            ) : (
              <MoonIcon className="hover:fill-pink-700 hover:stroke-pink-700" />
            )}
          </button>
          <div className="size-8 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% hover:scale-104 cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};

// const Header1 = () => {
//   const [themeDark, setThemeDark] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");

//     if (savedTheme === "dark") {
//       document.documentElement.classList.add("dark");
//       setThemeDark(true);
//     }
//   }, []);

//   const handleThemeChange = (e) => {
//     const isDark = document.documentElement.classList.toggle("dark");
//     localStorage.setItem("theme", isDark ? "dark" : "light");
//     setThemeDark(isDark);
//   };
//   return (
//     <div>
//       <nav className="h-20 w-full flex items-center py-12 my-0 rounded-b-4xl bg-sky-100 dark:bg-slate-950 sticky top-0 z-50">
//         <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
//           <div
//             className="font-regular text-xl bg-linear-to-r  bg-clip-text text-transparent from-pink-400 via-rose-400 to-pink-400 hover:scale-105 cursor-pointer
//           transition-all duration-500"
//           >
//             <span className="font-extrabold tracking-tighter">Tuff</span>Movies
//           </div>
//           <div className="border-2 border-neutral-500/70 rounded-4xl px-2 py-1 flex items-center justify-between gap-4 dark:border-neutral-200 dark:border scale-90 focus-within:border-pink-500/80 group focus-within:border-3 transition-all duration-200">
//             <Search className="dark:text-white text-neutral-500/70 group-focus-within:text-pink-500" />
//             <input
//               type="search"
//               className="flex-1 w-120 font-[Inter] tracking-tight rounded-2xl px-2 py-1 focus:outline-none dark:placeholder:text-neutral-400 dark:text-white "
//               placeholder="Search Movies, Series ..."
//             />
//           </div>
//           <div className="flex items-center justify-center gap-10">
//             <div className="flex text-slate-800 items-center justify-center gap-6 font-semibold font-[Inter] tracking-wide dark:text-white">
//               <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-3 hover:decoration-rose-700 transition-all duration-300 ">
//                 Home
//               </p>
//               <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-3 hover:decoration-rose-700 transition-all duration-300">
//                 {" "}
//                 Movies
//               </p>
//               <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-3 hover:decoration-rose-700 transition-all duration-300">
//                 Series
//               </p>
//               <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-3 hover:decoration-rose-700 transition-all duration-300">
//                 Discover
//               </p>
//               <button
//                 onClick={handleThemeChange}
//                 className="cursor-pointer p-2  transition-transform duration-200 hover:-rotate-12 active:rotate-40 "
//               >
//                 {themeDark ? (
//                   <Sun className="hover:fill-pink-700 hover:stroke-pink-700 " />
//                 ) : (
//                   <MoonIcon className="hover:fill-pink-700 hover:stroke-pink-700" />
//                 )}
//               </button>
//             </div>

//             <div className="size-10 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% hover:scale-104 cursor-pointer"></div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };
