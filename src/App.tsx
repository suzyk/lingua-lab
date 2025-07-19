import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Routes/Home";
import Games from "./Routes/Games";
import Homework from "./Routes/Homework";
import "./App.css";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games" element={<Games />}></Route>
        <Route path="/homework" element={<Homework />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
