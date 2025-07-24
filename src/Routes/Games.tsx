import React, { useState, useEffect } from "react";
import WordCard from "../Components/WordCard";
import { Card_Types, Word } from "../Model";
import { randomNoRepeats } from "../Util";
import ConfettiExplosion from "react-confetti-explosion";
import "../App.css";

const Games = () => {
  const vocab: Word[] = [
    { text: "cat", image_url: "../images/cat.png" },
    { text: "dog", image_url: "../images/dog.png" },
    { text: "fish", image_url: "../images/fish.png" },
    { text: "bird", image_url: "../images/bird.png" },
    { text: "tree", image_url: "../images/tree.png" },
  ];
  // double the words for text cards and image cards.
  vocab.push.apply(vocab, vocab);

  const [words, setwords] = useState<Word[]>(vocab);
  const [selectedText, setSelectedText] = useState<Word | null>(null);
  const [selectedImage, setSelectedImage] = useState<Word | null>(null);
  const [matched, setMatched] = useState<string[]>([]);

  const [randomizer] = useState(() => randomNoRepeats(words.length));
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const allMatched = words.length / 2 === matched.length;
  const handleCardClick = (word: Word, type: Card_Types) => {
    if (type === Card_Types.TEXT)
      setSelectedText((prev) => (prev?.text === word.text ? null : word));
    else setSelectedImage((prev) => (prev?.text === word.text ? null : word));
  };

  useEffect(() => {
    if (selectedText && selectedImage) {
      if (selectedText.text === selectedImage.text) {
        console.log("it's a match");
        setMatched([...matched, selectedText.text]);
      } else {
        // add red color
      }
      const timer = setTimeout(() => {
        setSelectedText(null);
        setSelectedImage(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedImage, selectedText]);

  useEffect(() => {
    if (allMatched) {
      setShowOverlay(true);
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [allMatched]);

  return (
    <div>
      <h1>Games</h1>
      <div className="gameBoard">
        <div className="deck">
          {randomizer
            .filter((randNum) => randNum < words.length / 2)
            .map((randNum) => (
              <WordCard
                key={randNum}
                word={words[randNum]}
                type={Card_Types.TEXT}
                onClick={() => handleCardClick(words[randNum], Card_Types.TEXT)}
                isSelected={selectedText?.text === words[randNum].text}
                isMatched={matched.includes(words[randNum].text)}
                disabled={
                  matched.includes(words[randNum].text) ||
                  (selectedText != null &&
                    selectedText.text !== words[randNum].text)
                }
              />
            ))}
        </div>
        <div className="deck">
          {randomizer
            .filter((randNum) => randNum >= words.length / 2)
            .map((randNum) => (
              <WordCard
                key={randNum}
                word={words[randNum]}
                type={Card_Types.IMAGE}
                onClick={() =>
                  handleCardClick(words[randNum], Card_Types.IMAGE)
                }
                isSelected={selectedImage?.text === words[randNum].text}
                isMatched={matched.includes(words[randNum].text)}
                disabled={
                  matched.includes(words[randNum].text) ||
                  (selectedImage != null &&
                    selectedImage.text !== words[randNum].text)
                }
              />
            ))}
        </div>
      </div>
      {showOverlay && (
        <div className=" overlay">
          <ConfettiExplosion
            particleCount={250}
            duration={4500}
            force={0.8}
            width={1200}
          />
          <h1>Good job! 🎉</h1>
          <img src="../images/medal.png" alt="Medal" style={{ width: "30%" }} />
        </div>
      )}
    </div>
  );
};

export default Games;
