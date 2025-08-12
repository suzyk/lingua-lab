//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Routes/Home";
import Games from "./Routes/Games";
import Homework from "./Routes/Homework";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games" element={<Games />}></Route>
        <Route path="/homework" element={<Homework />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
