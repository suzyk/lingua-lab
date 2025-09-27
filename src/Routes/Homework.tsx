import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Video from "../Components/Video";
import type { VideoHomework } from "../Model";
import ConfettiExplosion from "react-confetti-explosion";
import useFade from "../Util/useFade";
import { HOMEWORK_DATE, homework, fetchHomework } from "../Data/Data"; // <-- added fetchHomework
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
  console.log("in homework " + studentId + " " + videoId);

  // ---------------- Old localStorage code ----------------
  /*
  const stored = JSON.parse(
    localStorage.getItem(`homework-${HOMEWORK_DATE}`) || "{}"
  );

  const [videos, setVideos] = useState<VideoHomework[]>(
    stored.videos?.length ? stored.videos : homework
  );
  */
  // -------------------------------------------------------

  // New state for fetched homework
  const [videos, setVideos] = useState<VideoHomework[]>([]);
  const [loading, setLoading] = useState(true);

  const allWatched = videos.every((v) => v.isWatched);
  const [progress, setProgress] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const { shouldRender, fadeClass } = useFade(celebrate, {
    fadeIn: false,
    fadeOut: true,
    duration: 1000,
  });

  useEffect(() => {
    const loadHomework = async () => {
      try {
        if (!studentId) {
          // fallback to static data if no studentId
          setVideos(homework);
          return;
        }
        const hw = await fetchHomework(studentId);
        setVideos(hw);
      } catch (err) {
        console.error("Failed to fetch homework:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHomework();
  }, [studentId]);

  useEffect(() => {
    if (showPage && videoId) {
      const el = document.getElementById(videoId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [showPage, videoId]);

  // ---------------- Old localStorage save ----------------
  /*
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
  */
  // -------------------------------------------------------

  // Progress bar animation
  useEffect(() => {
    requestAnimationFrame(() => setProgress(100));
    const timer = setTimeout(() => setShowPage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Celebrate effect once
  useEffect(() => {
    // ---------------- Old localStorage check ----------------
    /*
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
    */
    // -------------------------------------------------------

    if (showPage && allWatched) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 1000);
      return () => clearTimeout(t);
    }
  }, [showPage, allWatched]);

  // ---------------- Updated handleWatched ----------------
  const handleWatched = async (index: number) => {
    const video = videos[index];

    console.log("handleWatched video:", video);
    console.log("assignmentId:", video.assignmentId);

    // Optimistic UI update
    setVideos((prev) =>
      prev.map((v, i) => (i === index ? { ...v, isWatched: true } : v))
    );

    try {
      // Update database
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
  // -------------------------------------------------------

  if (loading) {
    return (
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
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-white items-center justify-center w-full py-6 px-4 sm:px-6 md:px-8">
      {showPage && (
        <div className="w-full max-w-xl flex flex-col gap-6">
          <h3 className="text-gray-500 font-medium text-lg sm:text-xl text-center">
            {videos.length === 0 ? (
              "Ödev bulunmadı 😅"
            ) : (
              <>
                Madalyanın kilidini açmak için{" "}
                <strong className="text-blue-600 underline">'Done'</strong>{" "}
                düğmesine tıklayın! 🏅
              </>
            )}
          </h3>
          <ul className="flex flex-col gap-6">
            {videos.map((video, index) => (
              <li key={`homework_${video.id}`} id={video.id}>
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
