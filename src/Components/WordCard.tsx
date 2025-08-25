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
    <div className="relative">
      {type === Card_Types.TEXT && (
        <button
          className={`wordCard ${isSelected ? "selected" : ""} ${
            isMatched ? "matched" : ""
          } ${wrong ? "wrong" : ""}`}
          onClick={onClick}
          disabled={disabled}
        >
          {word.text}
        </button>
      )}
      {type === Card_Types.IMAGE && (
        <button
          className={`wordCard ${isSelected ? "selected" : ""} ${
            isMatched ? "matched" : ""
          } ${wrong ? "wrong" : ""}`}
          onClick={onClick}
          disabled={disabled}
        >
          <img src={word.image_url} alt={word.text} />
        </button>
      )}
      {isMatched && (
        <CircleCheck
          className="absolute bottom-2 right-2 float-right text-emerald-500"
          strokeWidth={3}
        />
      )}
      {type === Card_Types.COMPLETE && (
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
      )}
    </div>
  );
};

export default WordCard;
