// Sound Effect by <a href="https://pixabay.com/ko/users/matthewvakaliuk73627-48347364/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=290204">Matthew Vakalyuk</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=290204">Pixabay</a>

import { createContext, useRef, useContext, useEffect } from "react";

// Provide a default do-nothing function so the app won’t crash
const AudioContext = createContext<{
  playPopSound: () => void;
  playWrongSound: () => void;
  playClickSound: () => void;
}>({
  playPopSound: () => {},
  playWrongSound: () => {},
  playClickSound: () => {},
});

// children : whatever component audioprovider will wrap around.
export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  // useRef keeps the sound available even when things get re-rendered
  const popSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // after page is ready, load the file
    popSoundRef.current = new Audio("/sounds/pop.mp3");
    popSoundRef.current.preload = "auto";

    wrongSoundRef.current = new Audio("/sounds/mistake.mp3");
    wrongSoundRef.current.preload = "auto";

    clickSoundRef.current = new Audio("/sounds/mouseClick.mp3");
    clickSoundRef.current.preload = "auto";
  }, []);

  const playPopSound = () => {
    const audio = popSoundRef.current; // grab the ref and play it.
    if (audio) {
      audio.currentTime = 0; // file always plays from beginning
      audio.play();
    }
  };

  const playWrongSound = () => {
    const audio = wrongSoundRef.current; // grab the ref and play it.
    if (audio) {
      audio.currentTime = 0; // file always plays from beginning
      audio.play();
    }
  };

  const playClickSound = () => {
    const audio = clickSoundRef.current; // grab the ref and play it.
    if (audio) {
      audio.currentTime = 0; // file always plays from beginning
      audio.play();
    }
  };

  return (
    <AudioContext.Provider
      value={{ playPopSound, playWrongSound, playClickSound }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const usePopSound = () => {
  const { playPopSound } = useContext(AudioContext);
  return playPopSound;
};

export const useWrongSound = () => {
  const { playWrongSound } = useContext(AudioContext);
  return playWrongSound;
};

export const useClickSound = () => {
  const { playClickSound } = useContext(AudioContext);
  return playClickSound;
};
