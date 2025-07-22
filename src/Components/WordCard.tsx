import React from "react";
import "../App.css";
import { Word } from "../Model";

interface Props {
  word: Word;
  type: "TEXT" | "IMAGE";
}
const WordCard = ({ word, type }: Props) => {
  return type === "TEXT" ? (
    <div className="wordCard">{word.text}</div>
  ) : (
    <div className="wordCard__image">
      <img src={word.image_url} alt={word.text} />
    </div>
  );
};

export default WordCard;
