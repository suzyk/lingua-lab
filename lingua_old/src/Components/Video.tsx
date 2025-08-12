import React from "react";
import { VideoHomework } from "../Model";

interface Props {
  video: VideoHomework;
  handleWatched: () => void;
}
const Video = ({ video, handleWatched }: Props) => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={video.url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <button onClick={handleWatched} disabled={video.isWatched}>
        {video.isWatched ? "Completed" : "Done"}
      </button>
    </div>
  );
};

export default Video;
