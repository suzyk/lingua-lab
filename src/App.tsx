//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Routes/Home";
import Games from "./Routes/Games";
import Homework from "./Routes/Homework";
import Contact from "./Routes/Contact";
import Navbar from "./Components/Navbar";
import VocabLearning from "./Routes/VocabLearning";
import Quiz from "./Routes/Quiz";
import WordGame from "./Routes/WordGame";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games" element={<Games />}></Route>
        <Route path="/homework" element={<Homework />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/word-game" element={<WordGame />}></Route>
        <Route path="/vocab-learn" element={<VocabLearning />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
