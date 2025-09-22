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
import { AudioProvider } from "./Context/AudioProvider";
import { SpeechProvider } from "./Context/SpeechProvider";
import Auth from "./Components/Auth";
import Reset_Password from "./Components/Reset_Password";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <AudioProvider>
      <SpeechProvider>
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-amber-50 flex flex-col">
          <Router basename={import.meta.env.VITE_BASE_URL}>
            {/** In order for Links to work, components should be inside Router */}
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/games" element={<Games />}></Route>
              <Route path="/homework" element={<Homework />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/word-game" element={<WordGame />}></Route>
              <Route path="/vocab-learn" element={<VocabLearning />}></Route>
              <Route path="/quiz" element={<Quiz />}></Route>
              <Route path="/signIn" element={<Auth />}></Route>
              <Route path="/reset-password" element={<Reset_Password />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
          {/* Footer */}
          <footer className="py-4 text-center text-sm text-gray-600 border-t bg-white/60">
            Made with 💛 for kids learning everywhere · ©{" "}
            {new Date().getFullYear()} LinguaLab
          </footer>
        </div>
      </SpeechProvider>
    </AudioProvider>
  );
}

export default App;
