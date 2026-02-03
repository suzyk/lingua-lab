import { useEffect, useReducer } from "react";
import WordCard from "../Components/WordCard";
import { Card_Types, GameActionTypes } from "../Model/Model"; // runtime values
import type { Word, GameAction, WordGameState } from "../Model/Model"; // types only
import { randomNoRepeats } from "../Util/Util";
import GameScore from "../Components/GameScore";
import { flashcards } from "../Data/targetWords";
import { usePopSound, useWrongSound } from "../Context/AudioProvider";
import { useSpeech } from "../Context/SpeechProvider";

const MAX_CARD = 5;

// 🟢 Lazy initializer to avoid reshuffle on every render
function initWordGame(): WordGameState {
  const wordSet: Word[] = [...flashcards];
  const cappedRandom = randomNoRepeats(wordSet.length);

  // reduce to MAX_CARD
  cappedRandom.splice(0, wordSet.length - MAX_CARD);

  // build initial words
  const words: Word[] = cappedRandom.map((i) => wordSet[i]);

  // duplicate for text + image
  words.push(...words);

  return {
    words,
    selectedText: null,
    selectedImage: null,
    matched: [],
    wrong: false,
    clickedCards: [],
    showScoreBoard: false,
    randomizer: randomNoRepeats(words.length),
  };
}

const wordReducer = (
  state: WordGameState,
  action: GameAction
): WordGameState => {
  switch (action.type) {
    case GameActionTypes.SELECTED_TEXT: {
      return {
        ...state,
        selectedText:
          state.selectedText?.text === action.payload.text
            ? null
            : action.payload,
      };
    }
    case GameActionTypes.SELECTED_IMAGE: {
      return {
        ...state,
        selectedImage:
          state.selectedImage?.text === action.payload.text
            ? null
            : action.payload,
      };
    }
    case GameActionTypes.MATCHED: {
      return { ...state, matched: [...state.matched, action.payload] };
    }
    case GameActionTypes.WRONG: {
      return { ...state, wrong: action.payload };
    }
    case GameActionTypes.RESET_SELECTION: {
      return { ...state, selectedImage: null, selectedText: null };
    }
    case GameActionTypes.SHOW_SCOREBOARD: {
      return { ...state, showScoreBoard: action.payload };
    }
    case GameActionTypes.RESET_GAME: {
      // run initializer again for fresh shuffle
      return initWordGame();
    }
    default:
      return state;
  }
};

const WordGame = () => {
  const { speak } = useSpeech();
  const playPopSound = usePopSound();
  const playWrongSound = useWrongSound();
  // 🟢 use lazy init, so initWordGame runs once
  const [state, dispatch] = useReducer(wordReducer, undefined, initWordGame);

  const allMatched = state.words.length / 2 === state.matched.length;

  // TTS for Text Cards
  useEffect(() => {
    if (state.selectedText) {
      speak(state.selectedText.text);
    }
  }, [state.selectedText]);

  useEffect(() => {
    // Check for matches
    if (state.selectedText && state.selectedImage) {
      if (state.selectedText.text === state.selectedImage.text) {
        dispatch({
          type: GameActionTypes.MATCHED,
          payload: state.selectedText.text,
        });
      } else {
        playWrongSound();
        dispatch({ type: GameActionTypes.WRONG, payload: true });
      }

      const timer = setTimeout(() => {
        dispatch({ type: GameActionTypes.RESET_SELECTION });
      }, 500);
      return () => clearTimeout(timer);
    } else {
      dispatch({ type: GameActionTypes.WRONG, payload: false });
    }
  }, [state.selectedImage, state.selectedText]);

  useEffect(() => {
    if (allMatched) {
      dispatch({ type: GameActionTypes.SHOW_SCOREBOARD, payload: true });
    }
  }, [allMatched]);

  const handleCardClick = (word: Word, type: Card_Types) => {
    playPopSound(); // always play
    if (type === Card_Types.TEXT) {
      dispatch({ type: GameActionTypes.SELECTED_TEXT, payload: word });
    } else {
      dispatch({ type: GameActionTypes.SELECTED_IMAGE, payload: word });
    }
  };

  return (
    <div className="flex flex-col flex-1 py-6 px-0 sm:px-6 bg-white justify-center items-center ">
      <h1 className="header">Word Games</h1>
      <div className="gameBoard">
        <>
          {/* Scoreboard overlay */}
          {state.showScoreBoard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-full h-full">
              <GameScore score={100} dispatch={dispatch} />
            </div>
          )}
          <div className="deck">
            {state.randomizer
              .filter((randNum) => randNum < state.words.length / 2)
              .map((randNum) => (
                <WordCard
                  key={`text-${randNum}`}
                  word={state.words[randNum]}
                  type={Card_Types.TEXT}
                  onClick={() =>
                    handleCardClick(state.words[randNum], Card_Types.TEXT)
                  }
                  isSelected={
                    state.selectedText?.text === state.words[randNum].text
                  }
                  isMatched={state.matched.includes(state.words[randNum].text)}
                  disabled={
                    state.matched.includes(state.words[randNum].text) ||
                    (state.selectedText != null &&
                      state.selectedText.text !== state.words[randNum].text)
                  }
                  wrong={
                    state.selectedText?.text === state.words[randNum].text &&
                    state.wrong
                  }
                />
              ))}
          </div>
          <div className="deck">
            {state.randomizer
              .filter((randNum) => randNum >= state.words.length / 2)
              .map((randNum) => (
                <WordCard
                  key={`img-${randNum}`}
                  word={state.words[randNum]}
                  type={Card_Types.IMAGE}
                  onClick={() =>
                    handleCardClick(state.words[randNum], Card_Types.IMAGE)
                  }
                  isSelected={
                    state.selectedImage?.text === state.words[randNum].text
                  }
                  isMatched={state.matched.includes(state.words[randNum].text)}
                  disabled={
                    state.matched.includes(state.words[randNum].text) ||
                    (state.selectedImage != null &&
                      state.selectedImage.text !== state.words[randNum].text)
                  }
                  wrong={
                    state.selectedImage?.text === state.words[randNum].text &&
                    state.wrong
                  }
                />
              ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default WordGame;
