import { useState, useEffect } from "react";
import Video from "../Components/Video";
import type { VideoHomework } from "../Model";
import ConfettiExplosion from "react-confetti-explosion";

let VIDEO_STORAGE = "videos";

const Homework = () => {
  const storedVideos = JSON.parse(localStorage.getItem(VIDEO_STORAGE) || "[]");

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

  // add local storage to store data
  // add checkmark on Complete button
  // add checkmark on the right top corner of video
  // add quiz
  const allWatched = videos.every((video) => video.isWatched);
  const [progress, setProgress] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  // save watched videos in local storage
  useEffect(() => {
    localStorage.setItem(VIDEO_STORAGE, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1; // small increment
      setProgress(start);
      if (start >= 100) {
        clearInterval(interval);
        setShowPage(true); // reveal page after 100%
      }
    }, 15); // 15ms * 100 = 1500ms = 1.5s total
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showPage && allWatched) {
      setCelebrate(true);
      const timer = setTimeout(() => {
        setCelebrate(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showPage, allWatched]);

  const handleWatched = (index: number): void => {
    /*const updated = [...videos];
    updated[index].isWatched = true;
    setVideos(updated);
    */
    setVideos((prev) =>
      prev.map((v, i) => (i === index ? { ...v, isWatched: true } : v))
    );
  };
  return (
    <div className="flex flex-col items-center justify-center mt-6 mb-10 w-11/12 mx-auto rounded-4xl border-8 border-gray-200 shadow-[0_0px_20px_rgba(0,0,0,0.6)]">
      {!showPage && (
        // Loading animationanimation
        <div className="flex flex-col items-center justify-center h-64 gap-4 w-full">
          <div className="w-full h-1 bg-gray-200">
            <div
              className="h-full bg-blue-500 transition-width"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-gray-500 font-medium">Loading videos...</div>
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {showPage && (
        // Main content after loading
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

      {celebrate && (
        <div className="fixed inset-0 z-100 flex items-center justify-center ">
          {/* Confetti on top */}
          <div className="absolute top-10 flex items-center justify-center">
            <ConfettiExplosion
              width={window.innerWidth}
              height={window.innerHeight}
              particleCount={500}
              duration={2200}
              force={0.8}
              zIndex={200}
            />
          </div>

          {/* Modal */}
          <div className="relative z-[300] bg-white rounded-xl shadow-lg py-10 px-20 flex flex-col items-center pointer-events-auto">
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
