import React from "react";
import { Card_Types } from "../Model";
import type { Word } from "../Model";
import { CircleCheck } from "lucide-react";

interface Props {
  word: Word;
  type: Card_Types;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSelected?: boolean;
  isMatched?: boolean;
  disabled?: boolean;
  wrong?: boolean;
}
const WordCard = ({
  word,
  type,
  onClick,
  isSelected = false,
  isMatched = false,
  disabled = false,
  wrong = false,
}: Props) => {
  return (
    <>
      {type === Card_Types.TEXT && (
        <div className="relative w-35 h-25 sm:w-45 sm:h-35">
          <button
            className={`wordCard ${isSelected ? "selected" : ""} ${
              isMatched ? "matched" : ""
            } ${wrong ? "wrong" : ""}`}
            onClick={onClick}
            disabled={disabled}
          >
            {word.text}
          </button>
          {isMatched && (
            <CircleCheck
              className="absolute bottom-2 right-2 text-emerald-500"
              strokeWidth={3}
            />
          )}
        </div>
      )}
      {type === Card_Types.IMAGE && (
        <div className="relative w-35 h-25 sm:w-45 sm:h-35">
          <button
            className={`wordCard ${isSelected ? "selected" : ""} ${
              isMatched ? "matched" : ""
            } ${wrong ? "wrong" : ""}`}
            onClick={onClick}
            disabled={disabled}
          >
            <img src={word.image_url} alt={word.text} />
          </button>
          {isMatched && (
            <CircleCheck
              className="absolute bottom-2 right-2 text-emerald-500"
              strokeWidth={3}
            />
          )}
        </div>
      )}

      {type === Card_Types.COMPLETE && (
        <div className="w-35 h-45 flex items-center justify-center">
          <button
            className={`wordCard__complete ${isSelected ? "selected" : ""} ${
              isMatched ? "matched" : ""
            } ${wrong ? "wrong" : ""}`}
            onClick={onClick}
            disabled={disabled}
          >
            <img src={word.image_url} alt={word.text} />
            <label>{word.text}</label>
          </button>
        </div>
      )}
    </>
  );
};

export default WordCard;
