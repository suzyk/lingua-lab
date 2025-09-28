import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Video from "../Components/Video";
import type { VideoHomework } from "../Model";
import ConfettiExplosion from "react-confetti-explosion";
import useFade from "../Util/useFade";
import { defaultHomework, fetchHomework } from "../Data/Data";
import { supabase } from "../supabaseClient";

const Homework = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    fetchUser();
  }, []);

  const studentId = user?.id;
  const videoId = location.state?.videoId;

  const [videos, setVideos] = useState<VideoHomework[]>([]);
  const [loading, setLoading] = useState(true);
  const [celebrate, setCelebrate] = useState(false);

  const allWatched = videos.every((v) => v.isWatched);
  const { shouldRender, fadeClass } = useFade(celebrate, {
    fadeIn: false,
    fadeOut: true,
    duration: 1000,
  });

  useEffect(() => {
    if (!studentId) {
      const defaultVideos = defaultHomework.map((video) => ({ ...video }));
      setVideos(defaultVideos);
      setLoading(false);
    } else {
      const loadHomework = async () => {
        try {
          const hw = await fetchHomework(studentId);
          setVideos(hw);
        } catch (err) {
          console.error("Failed to fetch homework:", err);
        } finally {
          setLoading(false);
        }
      };

      loadHomework();
    }
  }, [studentId]);

  useEffect(() => {
    if (videoId) {
      const el = document.getElementById(videoId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [videoId, videos]);

  useEffect(() => {
    if (allWatched && videos.length > 0) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 1000);
      return () => clearTimeout(t);
    }
  }, [allWatched, videos]);

  const handleWatched = async (index: number) => {
    const video = videos[index];

    setVideos((prev) =>
      prev.map((v, i) => (i === index ? { ...v, isWatched: true } : v))
    );

    try {
      const { data, error } = await supabase
        .from("student_homework")
        .update({ completed: true })
        .eq("id", video.assignmentId)
        .select();

      if (error) {
        console.error("Supabase error:", error);
      } else {
        console.log("Updated rows:", data);
      }
    } catch (err) {
      console.error("Failed to mark homework as watched:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 w-full py-8">
        <div className="w-full max-w-xl space-y-4 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>

          {Array(3)
            .fill(0) // 3 arrays with 0 [0, 0, 0]
            .map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 rounded-lg shadow-inner shadow-gray-300 flex items-center justify-center"
              >
                <span className="text-gray-400">Loading video...</span>
              </div>
            ))}
        </div>
      </div>
    );
  }
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center font-medium text-lg sm:text-xl text-gray-500 my-12">
        Ödevler bulunmadı 😅
        <br />
        <button
          className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Tekrar dene
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-white items-center justify-center w-full py-6 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-xl flex flex-col gap-6">
        <h3 className="text-gray-500 font-medium text-lg sm:text-xl text-center">
          <>
            Madalyanın kilidini açmak için{" "}
            <strong className="text-blue-600 underline">'Done'</strong>{" "}
            düğmesine tıklayın! 🏅
          </>
        </h3>
        <ul className="flex flex-col gap-6">
          {videos.map((video, index) => (
            <li key={`homework_${video.id}`} id={video.id}>
              <Video video={video} handleWatched={() => handleWatched(index)} />
            </li>
          ))}
        </ul>
      </div>

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
