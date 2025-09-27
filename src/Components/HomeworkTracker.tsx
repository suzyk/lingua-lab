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

  return (
    <div className="flex flex-col max-w-md p-8 justify-center items-center bg-stone-50 rounded-2xl shadow-lg shadow-stone-200">
      <h1 className="text-3xl font-bold text-yellow-900">Homework Tracker</h1>
      <h3 className="mt-4 mb-2 text-yellow-800 font-medium">
        Completed: {watchedCount}/{videos.length}
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
            className="flex flex-row w-full justify-between items-center py-3 px-5 bg-white rounded-lg shadow-md shadow-stone-200 hover:shadow-lg transition"
          >
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg text-yellow-800 truncate overflow-hidden whitespace-nowrap max-w-[220px]">
                {video.title}
              </h1>
              <label className="text-sm text-yellow-600 font-medium">
                {`Due: ${video.dueDate}`}
              </label>
            </div>
            <div>
              {video.isWatched ? (
                <button
                  disabled={true}
                  className="px-4 py-1 text-white bg-stone-300 font-semibold border-2 border-stone-400 rounded-md"
                >
                  Tamamlandı
                </button>
              ) : (
                <button
                  onClick={() => goToHomework(video.id)}
                  className="px-4 py-1 text-yellow-700 font-semibold border-2 border-stone-400 rounded-md hover:bg-yellow-200 transition"
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
