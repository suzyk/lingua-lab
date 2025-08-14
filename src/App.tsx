//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./Routes/Home";
import Games from "./Routes/Games";
import Homework from "./Routes/Homework";
import Contact from "./Routes/Contact";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games" element={<Games />}></Route>
        <Route path="/homework" element={<Homework />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
