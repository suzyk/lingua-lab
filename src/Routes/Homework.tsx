import { useState, useEffect } from "react";
import Video from "../Components/Video";
import type { VideoHomework } from "../Model";
import ConfettiExplosion from "react-confetti-explosion";
import useFade from "../Util/useFade";

const Homework = () => {
  const storedVideos = JSON.parse(localStorage.getItem("videos") || "[]");

  const [videos, setVideos] = useState<VideoHomework[]>(
    storedVideos.length === 0
      ? [
          {
            url: "https://www.youtube.com/embed/eBVqcTEC3zQ?si=sxI7BLVOdl9yYXa5",
            isWatched: false,
          },
          {
            url: "https://www.youtube.com/embed/W9rX6ApYqjo?si=yUudL6YR4yxqAyjc",
            isWatched: false,
          },
          {
            url: "https://www.youtube.com/embed/-GSnmRZlgc4?si=xgfzXlo-ah8qAstS",
            isWatched: false,
          },
          {
            url: "https://www.youtube.com/embed/WFQIrd97t-Y?si=bIxyh0CRNYSkCVrt",
            isWatched: false,
          },
        ]
      : storedVideos
  );

  const allWatched = videos.every((v) => v.isWatched);
  const [progress, setProgress] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  // Fade controller for the celebrate modal (1s)
  const { shouldRender, fadeClass } = useFade(celebrate, {
    fadeIn: false,
    fadeOut: true,
    duration: 1000,
  });

  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  // Progress bar: single CSS-driven animation
  useEffect(() => {
    requestAnimationFrame(() => setProgress(100));
    const timer = setTimeout(() => setShowPage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showPage && allWatched) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 1000);
      return () => clearTimeout(t);
    }
  }, [showPage, allWatched]);

  const handleWatched = (index: number) =>
    setVideos((prev) =>
      prev.map((v, i) => (i === index ? { ...v, isWatched: true } : v))
    );

  return (
    <div className="flex flex-col items-center justify-center mt-6 mb-10 w-11/12 mx-auto rounded-4xl border-8 border-gray-200 shadow-[0_0px_20px_rgba(0,0,0,0.6)]">
      {!showPage && (
        <div className="flex flex-col items-center justify-center h-64 gap-4 w-full">
          <div className="w-full h-1 bg-gray-200">
            <div
              className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-gray-500 font-medium">Loading videos...</div>
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {showPage && (
        <div>
          <h3 className="m-6 text-gray-500 font-medium text-xl">
            Don't forget to click{" "}
            <strong className="text-blue-600 underline">'Done'</strong> button
            to unlock your medal! 🏅
          </h3>
          <ul className="flex flex-col gap-10 pb-10">
            {videos.map((video, index) => (
              <li key={index}>
                <Video
                  video={video}
                  handleWatched={() => handleWatched(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {shouldRender && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-300">
          {/* Confetti */}
          <div className="absolute top-10 flex items-center justify-center">
            <ConfettiExplosion
              width={window.innerWidth}
              height={window.innerHeight}
              particleCount={500}
              duration={2800}
              force={0.8}
              zIndex={200}
            />
          </div>

          {/* Modal */}
          <div
            className={`relative z-[300] bg-white rounded-xl shadow-lg py-10 px-20 flex flex-col items-center pointer-events-auto
                         ${fadeClass}`}
          >
            <h1 className="text-4xl font-semibold text-center mb-4">
              Good job! 🎉
            </h1>
            <img
              className="w-40 h-40 object-contain"
              src="../images/medal.png"
              alt="Medal"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Homework;
