import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        <Link to={"/homework"}>Homework</Link>
      </h1>
      <h1>
        <Link to={"/games"}>Games</Link>
      </h1>
    </div>
  );
};

export default Home;
