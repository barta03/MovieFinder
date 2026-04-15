// import { ArrowLeft } from "lucide-react";
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const SeriesWatch = () => {
//   const { seriesId } = useParams();
//   const [visible, setVisible] = useState(true)
//   let timerRef = useRef(null);
//   const navigate = useNavigate()

//   const startTimer = () => {
//     clearTimeout(timerRef.current)
//     timerRef = setTimeout(()=>{
//       setVisible(false)
//     },[7000])
//   };

//   useEffect(()=>{
//     startTimer()
//     return ()=> clearTimeout(timerRef.current)
//   },[])

//   const handleMouseMove = ()=>{
//     setVisible(true)
//     startTimer()
//   }
//   return (
//     <>
//       <div className=" bg-slate-950 fixed inset-0 z-200 h-screen" onMouseMove={handleMouseMove}>
//         {visible && <button onClick={()=>(navigate(`/movie/${seriesId}`))} className={`z-201 fixed top-10 left-20 transition-all duration-5000 ${visible ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-5"}`}>
//           <ArrowLeft  className="size-10 text-white"/>
//         </button>}
//         <iframe
//         onMouseMove={handleMouseMove}
//           src={`https://bcine.app/embed/movie/${seriesId}`}
//           width="100%"
//           height="100%"
//           allowFullScreen
//           allow="autoplay; encrypted-media"
//           className="border-0 aspect-video"
//         ></iframe>
//       </div>
//       {/* <div className="relative min-h-screen bg-red-500"></div> */}
//     </>
//   );
// };

// export default SeriesWatch;
