import { ArrowLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MovieWatch = () => {
  const { movieId } = useParams();
  const [visible, setVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  let timerRef = useRef(null);
  const navigate = useNavigate();

  const startTimer = () => {
    if (!isFullscreen) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(false);
      }, 7000);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement ||
                               document.webkitFullscreenElement ||
                               document.mozFullScreenElement ||
                               document.msFullscreenElement;

      setIsFullscreen(!!fullscreenElement);
      if (fullscreenElement) {
        setVisible(true); // Keep controls visible in fullscreen
      } else {
        startTimer(); // Resume normal behavior when exiting fullscreen
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    startTimer();
    return () => {
      clearTimeout(timerRef.current);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  const handleMouseMove = () => {
    if (!isFullscreen) {
      setVisible(true);
      startTimer();
    }
  };

  return (
    <>
      <div className=" bg-slate-950 fixed inset-0 z-200 h-screen" onMouseMove={handleMouseMove}>
        {visible && <button onClick={()=>(navigate(`/movie/${movieId}`))} className={`z-201 fixed top-10 left-20 transition-all duration-5000 ${visible ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-5"}`}>
          <ArrowLeft  className="size-10 text-white"/>
        </button>}
        <iframe
        onMouseMove={handleMouseMove}
          src={`https://bcine.app/embed/movie/${movieId}`}
          width="50%"
          height="100%"
          allowFullScreen
          allow="autoplay; encrypted-media"
          className="border-0 aspect-video"
        ></iframe>
      </div>
      {/* <div className="relative min-h-screen bg-red-500"></div> */}
    </>
  );
};

export default MovieWatch;
