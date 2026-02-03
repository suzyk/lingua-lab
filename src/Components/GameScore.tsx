import ScoreStars from "./ScoreStars";
import { GameActionTypes, type GameAction } from "../Model/Model";

const MAX_STARS = 3;

interface Props {
  score: number;
  dispatch: React.Dispatch<GameAction>;
}
const getStars = (score: number, maxStars: number = MAX_STARS): number => {
  const percentage = score / 100; // turn score into 0–1
  return Math.floor(percentage * (maxStars + 1));
};

const getThemeInfo = (stars: number): { message: string; color: string } => {
  switch (stars) {
    case 0:
      return { message: "Oh no!", color: "text-gray-400" };
    case 1:
      return { message: "Passed", color: "text-gray-400" };
    case 2:
      return { message: "Not Bad", color: "text-orange-400" };
    default:
      return { message: "Good Job! 🎉", color: "text-green-400" };
  }
};

const GameScore = ({ score, dispatch }: Props) => {
  const earnedStars = getStars(score, MAX_STARS);
  const themeInfo = getThemeInfo(earnedStars);

  const handlePlayAgain = () => {
    dispatch({ type: GameActionTypes.RESET_GAME });
  };

  return (
    <div className="grid grid-cols-1 gap-3 p-2 bg-sky-100 rounded-4xl border-8 border-gray-400">
      <h1
        className={`text-4xl sm:text-5xl font-semibold text-center mb-4 ${themeInfo.color}`}
      >
        {themeInfo.message}
      </h1>
      <ScoreStars stars={earnedStars} total={MAX_STARS} />
      <div className="flex justify-center items-center">
        <button
          className="gameScore__button font-semibold"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameScore;
