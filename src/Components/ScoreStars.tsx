import { Star } from "lucide-react";

interface Props {
  stars: number; // number of stars
  total: number; // number of stars to display
}

const ScoreStars = ({ stars, total }: Props) => {
  console.log(stars);
  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={i < stars ? "text-yellow-400" : "text-gray-300"}
          size={60}
          fill={i < stars ? "yellow" : "#D3D3D3"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

export default ScoreStars;
