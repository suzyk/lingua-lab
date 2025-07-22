import React, { useState } from "react";
import WordCard from "../Components/WordCard";
import { Word } from "../Model";

const randomNoRepeats = (max: number): number[] => {
  let nums = Array.from(Array(max).keys());
  let ranNums: number[] = [];
  let i = nums.length;

  while (i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    ranNums.push(nums[rand]);
    nums.splice(rand, 1);
  }
  return ranNums;
};
const Games = () => {
  const vocab: Word[] = [
    { text: "cat", image_url: "../images/cat.png" },
    { text: "dog", image_url: "../images/dog.png" },
    { text: "fish", image_url: "../images/fish.png" },
    { text: "bird", image_url: "../images/bird.png" },
    { text: "tree", image_url: "../images/tree.png" },
  ];
  // couble the words for text cards and image cards.
  vocab.push.apply(vocab, vocab);

  const [words, setwords] = useState<Word[]>(vocab);

  const [randomizer] = useState(() => randomNoRepeats(words.length));
  console.log(randomizer);

  return (
    <div>
      <h1>Games</h1>
      <div className="gameBoard">
        {randomizer.map((randNum) =>
          randNum < words.length / 2 ? (
            <WordCard word={words[randNum]} type="TEXT" />
          ) : (
            <WordCard word={words[randNum]} type="IMAGE" />
          )
        )}
      </div>
    </div>
  );
};

export default Games;
