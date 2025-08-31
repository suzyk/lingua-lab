import { useState } from "react";
import type { VideoHomework } from "../Model";

interface Props {
  video: VideoHomework;
  handleWatched: () => void;
}

const Video = ({ video, handleWatched }: Props) => {
  const [status, setStatus] = useState<"idle" | "loading" | "complete">(
    video.isWatched ? "complete" : "idle"
  );

  const handleClick = () => {
    setStatus("loading");
    setTimeout(() => {
      handleWatched();
      setStatus("complete");
    }, 1000);
  };

  return (
    <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4 items-center">
      {/* Video */}
      <div className="w-full aspect-video">
        <iframe
          className="w-full h-full rounded-md"
          src={video.url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Button / Status */}
      <div className="flex w-40 h-9 justify-center items-center mt-2 sm:mt-0">
        {status === "idle" && (
          <button
            onClick={handleClick}
            disabled={video.isWatched}
            className="px-5 py-1.5 rounded-md text-white font-semibold bg-red-400 hover:bg-red-500"
          >
            {video.isWatched ? "Completed" : "Done"}
          </button>
        )}
        {status === "loading" && (
          <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        )}
        {status === "complete" && (
          <span className="font-semibold bg-gray-100 p-2 rounded-md">
            ✅ Complete
          </span>
        )}
      </div>
    </div>
  );
};

export default Video;
