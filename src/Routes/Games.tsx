import { Link } from "react-router";

const Games = () => {
  return (
    <div className="flex flex-col flex-1 bg-white items-center justify-center">
      <h1 className="header">Games</h1>
      <Link to={"/vocab-learn"} className="game_link_buttons">
        Vocab Learning
      </Link>
      <Link to={"/word-game"} className="game_link_buttons">
        Word Game
      </Link>
      <Link to={"/quiz"} className="game_link_buttons">
        Quiz
      </Link>
    </div>
  );
};
export default Games;
