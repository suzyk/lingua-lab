import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHomework } from "../Data/Data";
import type { VideoHomework } from "../Model";

interface Props {
  studentId: string;
}
const HomeworkTracker = ({ studentId }: Props) => {
  const navigate = useNavigate();
  /*
  const stored = JSON.parse(
    localStorage.getItem(`homework-${HOMEWORK_DATE}`) || "{}"
  );

  const [videos, setVideos] = useState<VideoHomework[]>(
    stored.videos?.length ? stored.videos : homework
  );*/
  const [videos, setVideos] = useState<VideoHomework[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomework = async () => {
      const hw = await fetchHomework(studentId);
      setVideos(hw);
      setLoading(false);
    };
    if (studentId) {
      loadHomework();
    }
    /** same stuff
       * if (studentId) {
    fetchHomework(studentId).then((data) => {
      setVideos(data);
      setLoading(false);
    });
  }
       */
  }, [studentId]);

  const watchedCount = videos.filter((v) => v.isWatched).length;

  const goToHomework = (videoId?: string) => {
    if (videoId) navigate("/homework", { state: { studentId, videoId } });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full p-6">
        <div className="h-6 w-48 bg-stone-200 rounded mb-2 animate-pulse"></div>
        <div className="h-4 w-32 bg-stone-100 rounded animate-pulse"></div>
        <ul className="w-full mt-4 space-y-2">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <li
                key={i}
                className="h-16 bg-stone-100 rounded-lg animate-pulse"
              />
            ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-lg p-6 sm:p-8 justify-center items-center bg-stone-50 rounded-2xl shadow-lg shadow-stone-200">
      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-900 text-center">
        Ödev Takipçisi
      </h1>
      <h3 className="mt-3 mb-2 text-yellow-800 font-medium text-center">
        Tamamlanmış: {watchedCount}/{videos.length}
      </h3>

      {/* Progress bar */}
      <div className="w-full h-3 mb-6 rounded-full bg-stone-200 overflow-hidden">
        <div
          className="bg-yellow-500 h-3 transition-all duration-1000 ease-linear"
          style={{ width: `${(watchedCount / videos.length) * 100}%` }}
        />
      </div>

      {/* Homework list */}
      <ul className="w-full space-y-4">
        {videos.map((video) => (
          <li
            key={`track_${video.assignmentId}`}
            className="flex flex-col sm:flex-row w-full sm:justify-between sm:items-center gap-3 py-3 px-4 sm:px-5 bg-white rounded-lg shadow-md shadow-stone-200 hover:shadow-lg transition"
          >
            <div className="flex flex-col flex-1">
              <h1 className="font-semibold text-base sm:text-lg text-yellow-800 truncate max-w-full">
                {video.title}
              </h1>
              <label className="text-sm text-yellow-600 font-medium">
                {`Bitiş Tarihi: ${video.dueDate}`}
              </label>
            </div>
            <div className="flex-shrink-0">
              {video.isWatched ? (
                <button
                  disabled
                  className="w-full sm:w-auto px-4 py-1 text-white bg-stone-300 font-semibold border-2 border-stone-400 rounded-md"
                >
                  Tamamlandı
                </button>
              ) : (
                <button
                  onClick={() => goToHomework(video.id)}
                  className="w-full sm:w-auto px-4 py-1 text-yellow-700 font-semibold border-2 border-stone-400 rounded-md hover:bg-yellow-200 transition"
                >
                  Ödeve git
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeworkTracker;
