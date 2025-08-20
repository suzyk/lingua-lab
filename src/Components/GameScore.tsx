import ScoreStars from "./ScoreStars";

const MAX_STARS = 3;

interface Props {
  score: number;
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

const GameScore = ({ score }: Props) => {
  const earnedStars = getStars(score, MAX_STARS);
  const themeInfo = getThemeInfo(earnedStars);

  return (
    <div className="grid grid-cols-1 gap-3 p-2">
      <h1
        className={`text-4xl font-semibold text-center mb-4 ${themeInfo.color}`}
      >
        {themeInfo.message}
      </h1>
      <div>
        <ScoreStars stars={earnedStars} total={MAX_STARS} />
      </div>

      <img
        className="w-40 h-40 object-contain"
        src="../images/medal.png"
        alt="Medal"
      />
    </div>
  );
};

export default GameScore;
