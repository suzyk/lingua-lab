import { useState } from "react";
import { Card_Types, type Word } from "../Model";
import { targetWords } from "../data/targetWords";
import { randomNoRepeats } from "../Util/Util";
import WordCard from "../Components/WordCard";

const VocabLearning = () => {
  const words: Word[] = targetWords;
  const [randomizer] = useState(() => randomNoRepeats(words.length));
  const [page, setPage] = useState(0);
  const itemPerWindow = 4;
  const totalPages = Math.ceil(words.length / itemPerWindow);

  const nextPage = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const start = page * itemPerWindow; //page starts from 0.
  const currentRandoms = randomizer.slice(start, start + itemPerWindow);

  const handleClick = (word: Word) => {
    console.log("READ THE WORD " + word.text);
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="header">Vocab Learning</h1>
      <div className="grid grid-cols-2 grid-rows-2 justify-center align-items overflow-hidden items-center  w-[60vw] h-[80vh] bg-sky-100 border-gray-300 border-4 rounded-4xl">
        {/* <h1>Theme (animal)</h1> */}
        {currentRandoms.map((randNum) => (
          <div className="flex items-center justify-center">
            <WordCard
              word={words[randNum]}
              type={Card_Types.COMPLETE}
              onClick={() => handleClick(words[randNum])}
            />
          </div>
        ))}
      </div>
      {/* paging button */}
      <div></div>
    </div>
  );
};
export default VocabLearning;
