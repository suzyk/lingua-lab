import { useState } from "react";
import { Card_Types, type Word } from "../Model";
import { targetWords } from "../data/targetWords";
import { randomNoRepeats } from "../Util/Util";
import WordCard from "../Components/WordCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const VocabLearning = () => {
  const words: Word[] = targetWords;
  const [randomizer] = useState(() => randomNoRepeats(words.length));
  const [page, setPage] = useState(0);
  const itemPerWindow = 4;
  const totalPages = Math.ceil(words.length / itemPerWindow);

  const nextPage = () => {
    console.log("next page");
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    console.log("prev page");
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const start = page * itemPerWindow; //page starts from 0.
  const currentRandoms = randomizer.slice(start, start + itemPerWindow);

  const handleClick = (word: Word) => {
    console.log("READ THE WORD " + word.text);
  };
  return (
    <div className="flex flex-col flex-1 bg-white justify-center items-center ">
      <h1 className="header">Vocab Learning</h1>
      {/* Colored Game board */}
      {/* <div className="justify-center align-items overflow-hidden items-center  w-[80vw] h-[80vh] bg-gradient-to-b from-sky-200 via-sky-100 to-green-100 border-gray-300 border-4 rounded-4xl">
       */}
      <div className="gameBoard">
        <h2 className="py-4 text-3xl text-gray-500 font-bold text-center">
          {words[0].theme}
        </h2>
        <div className="w-full h-[55vh] px-3.5 grid gap-2 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
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
        {/* Pagination Control */}
        <div className="flex flex-row items-center justify-center">
          <ChevronLeft
            strokeWidth={3}
            onClick={prevPage}
            className="text-white bg-yellow-500 pr-1 rounded-full border-white border-4 w-12 h-12 hover:bg-yellow-400"
          />
          <Link
            to={"/word-game"}
            className="w-40 h-15 mx-4 bg-amber-500 rounded-2xl border-4 border-white text-white font-bold text-2xl hover:bg-amber-400"
          >
            <button className="w-full h-full cursor-pointer">Quiz</button>
          </Link>
          <ChevronRight
            strokeWidth={3}
            onClick={nextPage}
            className="text-white bg-yellow-500 pl-1 rounded-full border-white border-4 w-12 h-12 hover:bg-yellow-400"
          />
        </div>
      </div>

      {/* paging button */}
      <div></div>
    </div>
  );
};
export default VocabLearning;
