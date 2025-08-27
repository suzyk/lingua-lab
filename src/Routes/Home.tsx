import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
      {/**  flex-1 grows or shrinks to fil the remaining size in the parent */}
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
        Make <span className="text-amber-500">English</span> learning <br />
        fun & sunny 🌟
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        Games, stories, and homework designed to bring joy and creativity to
        every lesson.
      </p>
      <div className="flex gap-4">
        <Link
          to="/games"
          className="px-6 py-3 rounded-2xl bg-amber-400 text-white font-semibold shadow-md hover:bg-amber-500 transition"
        >
          <button className="cursor-pointer">Play Now 🎮</button>
        </Link>
        <Link
          to="/homework"
          className="px-6 py-3 rounded-2xl border-2 border-amber-400 text-amber-500 font-semibold hover:bg-amber-50 transition"
        >
          <button className="cursor-pointer">Homework ✏️</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
