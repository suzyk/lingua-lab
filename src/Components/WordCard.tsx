import React from "react";
import { Card_Types } from "../Model";
import type { Word } from "../Model";
import { CircleCheck } from "lucide-react";

interface Props {
  word: Word;
  type: Card_Types;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isSelected: boolean;
  isMatched: boolean;
  disabled: boolean;
  wrong: boolean;
}
const WordCard = ({
  word,
  type,
  onClick,
  isSelected,
  isMatched,
  disabled,
  wrong,
}: Props) => {
  return type === Card_Types.TEXT ? (
    <div className="relative">
      <button
        className={`wordCard ${isSelected ? "selected" : ""} ${
          isMatched ? "matched" : ""
        } ${wrong ? "wrong" : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {word.text}
      </button>
      <CircleCheck className="absolute bottom-0 float-right" />
    </div>
  ) : (
    <button
      className={`wordCard ${isSelected ? "selected" : ""} ${
        isMatched ? "matched" : ""
      } ${wrong ? "wrong" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <img src={word.image_url} alt={word.text} />
    </button>
  );
};

export default WordCard;
