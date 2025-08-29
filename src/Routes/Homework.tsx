import { useState, useEffect } from "react";
import Video from "../Components/Video";
import type { VideoHomework } from "../Model";
import ConfettiExplosion from "react-confetti-explosion";
import useFade from "../Util/useFade";

const HOMEWORK_DATE = "2025-08-28";

const Homework = () => {
  const stored = JSON.parse(
    localStorage.getItem(`homework-${HOMEWORK_DATE}`) || "{}"
  );

  const [videos, setVideos] = useState<VideoHomework[]>(
    stored.videos?.length
      ? stored.videos
      : [
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
  );

  const allWatched = videos.every((v) => v.isWatched);
  const [progress, setProgress] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const { shouldRender, fadeClass } = useFade(celebrate, {
    fadeIn: false,
    fadeOut: true,
    duration: 1000,
  });

  // Save videos + celebrate flag in localStorage
  useEffect(() => {
    const homeworkInfo = {
      videos,
      celebrated: stored.celebrated || false,
    };
    localStorage.setItem(
      `homework-${HOMEWORK_DATE}`,
      JSON.stringify(homeworkInfo)
    );
  }, [videos]);

  // Progress bar animation
  useEffect(() => {
    requestAnimationFrame(() => setProgress(100));
    const timer = setTimeout(() => setShowPage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Celebrate effect once
  useEffect(() => {
    const homeworkInfo = JSON.parse(
      localStorage.getItem(`homework-${HOMEWORK_DATE}`) || "{}"
    );

    if (showPage && allWatched && !homeworkInfo.celebrated) {
      setCelebrate(true);

      // Update localStorage to mark as celebrated
      localStorage.setItem(
        `homework-${HOMEWORK_DATE}`,
        JSON.stringify({ ...homeworkInfo, celebrated: true })
      );

      const t = setTimeout(() => setCelebrate(false), 1000);
      return () => clearTimeout(t);
    }
  }, [showPage, allWatched]);

  const handleWatched = (index: number) =>
    setVideos((prev) =>
      prev.map((v, i) => (i === index ? { ...v, isWatched: true } : v))
    );

  return (
    <div className="flex flex-col flex-1 bg-white items-center justify-center w-full py-6 px-4 sm:px-6 md:px-8">
      {!showPage && (
        <div className="flex flex-col items-center  h-64 gap-4 w-full">
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
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <h3 className="text-gray-500 font-medium text-lg sm:text-xl text-center">
            Don't forget to click{" "}
            <strong className="text-blue-600 underline">'Done'</strong> button
            to unlock your medal! 🏅
          </h3>
          <ul className="flex flex-col gap-6">
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

          <div
            className={`relative z-[300] bg-white rounded-xl shadow-lg py-10 px-6 sm:px-10 flex flex-col items-center pointer-events-auto ${fadeClass}`}
          >
            <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4">
              Good job! 🎉
            </h1>
            <img
              className="w-32 sm:w-40 h-32 sm:h-40 object-contain"
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
