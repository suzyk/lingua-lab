import { useState, useEffect } from "react";
import Video from "../Components/Video";
import type { VideoHomework } from "../Model";
import "../App.css";
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

  // save watched videos in local storage
  useEffect(() => {
    localStorage.setItem(VIDEO_STORAGE, JSON.stringify(videos));
  }, [videos]);

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
    <div>
      <h1>Homework</h1>
      <h3>Don't forget to click 'Done' button to unlock your medal!</h3>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <Video video={video} handleWatched={() => handleWatched(index)} />
          </li>
        ))}
      </ul>
      {allWatched && (
        <div className=" overlay">
          <ConfettiExplosion
            particleCount={250}
            duration={4500}
            force={0.8}
            width={1200}
          />
          <h1>Good job! 🎉</h1>
          <img src="../images/medal.png" alt="Medal" style={{ width: "30%" }} />
        </div>
      )}
    </div>
  );
};

export default Homework;
