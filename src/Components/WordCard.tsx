import React from "react";
import "../App.css";
import { Card_Types, Word } from "../Model";

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
    <button
      className={`wordCard ${isSelected ? "selected" : ""} ${
        isMatched ? "matched" : ""
      } ${wrong ? "wrong" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {word.text}
    </button>
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
