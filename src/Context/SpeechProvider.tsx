import { createContext, useContext, useEffect, useState } from "react";

type SpeechContextType = {
  speak: (text: string) => void;
};

const SpeechContext = createContext<SpeechContextType>({
  speak: () => {},
});

export const SpeechProvider = ({ children }: { children: React.ReactNode }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // Function to load voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Try once immediately
    loadVoices();

    // Safari/Chrome may populate voices asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Preload a silent utterance to reduce lag on iOS Safari
    const preload = new SpeechSynthesisUtterance("loading");
    preload.volume = 0;
    window.speechSynthesis.speak(preload);
  }, []);

  const speak = (text: string) => {
    if (!voices.length) return; // fallback: no voices yet

    const utterance = new SpeechSynthesisUtterance(text);

    // Prefer high-quality US English voice
    utterance.voice =
      voices.find(
        (v) => v.lang.startsWith("en-US") && !v.name.includes("Compact")
      ) ||
      voices.find((v) => v.lang.startsWith("en-US")) ||
      voices[0];

    // Safari tends to sound fast — slow it down
    //const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    utterance.rate = 0.8; //isSafari ? 0.8 : 1;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <SpeechContext.Provider value={{ speak }}>
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => useContext(SpeechContext);
