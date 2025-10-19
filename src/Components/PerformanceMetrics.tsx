import { useEffect, useState } from "react";
import { fetchHTSummary } from "../Data/Data";
import type { HWSummary } from "../Model";

interface Props {
  studentId: string;
}
const PerformanceMetrics = ({ studentId }: Props) => {
  const [hwSummary, setHWSummary] = useState<HWSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const size = 224;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const loadHWCompletion = async () => {
      const hwSummaryInfo = await fetchHTSummary(studentId);
      setHWSummary(hwSummaryInfo);
      setLoading(false);
    };
    if (studentId) {
      loadHWCompletion();
    }
  }, [studentId]);

  useEffect(() => {
    if (!hwSummary) return;
    const targetOffset =
      circumference - (hwSummary.completionRate / 100) * circumference;
    setTimeout(() => setOffset(targetOffset), 50); // tiny delay ensures transition runs
  }, [hwSummary, circumference]);

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
      {/* Homework Completion rate */}

      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-900 text-center">
        Ödev Tamamlama Oranı
      </h1>
      <div className="relative w-56 h-56">
        {/** outer circle shadow */}
        <div className="absolute inset-0 bg-white rounded-full p-6 [box-shadow:6px_6px_10px_rgba(0,0,0,0.25),-6px_-6px_10px_rgba(255,255,255,0.7)]">
          {/** inner circle shadow */}
          <div className="flex items-center justify-center w-44 h-44 rounded-full [box-shadow:inset_6px_6px_12px_rgba(0,0,0,0.25),inset_-2px_-2px_0px_rgba(0,0,0,0.05)]">
            <span className="text-3xl font-semibold text-gray-600">
              {hwSummary?.completionRate}%
            </span>
          </div>
        </div>
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
              {/* <stop offset="0%" stopColor="#DA22FF" />
              <stop offset="100%" stopColor="#9733EE" /> */}
            </linearGradient>
          </defs>
          <circle
            r={radius} // radius is required
            cx={size / 2}
            cy={size / 2}
            stroke="url(#GradientColor)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1.5s ease-out",
            }}
          />
          {/** dasharray means circumference : 2pi*r = 2pi*44 = 276
           * circumference * (1 - 0.65) // 65% filled
           */}
        </svg>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
