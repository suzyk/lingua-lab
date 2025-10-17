import "../PerformanceMetrics.css";

const PerformanceMetrics = () => {
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
            <span className="text-3xl font-semibold text-gray-600">65%</span>
          </div>
        </div>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#DA22FF" />
              <stop offset="100%" stopColor="#9733EE" />
              {/* <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="33%" stopColor="#ffcc00" />
            <stop offset="66%" stopColor="#ffcc00" />
            <stop offset="100%" stopColor="#00cc66" /> */}
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="44" strokeLinecap="round" />
          {/** dasharray means circumference : 2pi*r = 2pi*44 = 276
           * circumference * (1 - 0.65) // 65% filled
           */}
        </svg>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
