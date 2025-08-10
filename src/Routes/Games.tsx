import React, { useState, useEffect, useReducer } from "react";
import WordCard from "../Components/WordCard";
import {
  Card_Types,
  Word,
  GameAction,
  GameActionTypes,
  WordGameState,
} from "../Model";
import { randomNoRepeats } from "../Util";
import ConfettiExplosion from "react-confetti-explosion";
import "../App.css";

const wordReducer = (
  state: WordGameState,
  action: GameAction
): WordGameState => {
  switch (action.type) {
    case GameActionTypes.SELECTED_TEXT: {
      console.log("text selected");
      return {
        ...state,
        selectedText:
          state.selectedText?.text === action.payload.text
            ? null
            : action.payload,
      };
    }
    case GameActionTypes.SELECTED_IMAGE: {
      console.log("image selected");
      return {
        ...state,
        selectedImage:
          state.selectedImage?.text === action.payload.text
            ? null
            : action.payload,
      };
    }
    case GameActionTypes.MATCHED: {
      console.log("card mathced!");
      return { ...state, matched: [...state.matched, action.payload] };
    }
    case GameActionTypes.WRONG: {
      console.log("match wrong!");
      return {
        ...state,
        wrong: action.payload,
      };
    }
    case GameActionTypes.RESET_SELECTION: {
      console.log("reset selection");
      return {
        ...state,
        selectedImage: null,
        selectedText: null,
      };
    }

    default:
      return state;
  }
};

const Games = () => {
  const words: Word[] = [
    { text: "cat", image_url: "../images/cat.png" },
    { text: "dog", image_url: "../images/dog.png" },
    { text: "fish", image_url: "../images/fish.png" },
    { text: "bird", image_url: "../images/bird.png" },
    { text: "tree", image_url: "../images/tree.png" },
  ];
  // double the words for text cards and image cards.
  words.push.apply(words, words);

  // const [words, setwords] = useState<Word[]>(vocab);
  const initialState: WordGameState = {
    words: words,
    selectedText: null,
    selectedImage: null,
    matched: [],
    wrong: false,
    clickedCards: [], //status: 'idle' | 'checking' | 'complete'
  };

  const [state, dispatch] = useReducer(wordReducer, initialState); // set default
  //const [selectedText, setSelectedText] = useState<Word | null>(null);
  //const [selectedImage, setSelectedImage] = useState<Word | null>(null);
  //const [matched, setMatched] = useState<string[]>([]);
  //const [wrong, setWrong] = useState<boolean>(false);

  const [randomizer] = useState(() => randomNoRepeats(words.length));
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const allMatched = words.length / 2 === state.matched.length;
  /*
  const handleCardClick = (word: Word, type: Card_Types) => {
    if (type === Card_Types.TEXT)
      setSelectedText((prev) => (prev?.text === word.text ? null : word));
    else setSelectedImage((prev) => (prev?.text === word.text ? null : word));
  };*/

  useEffect(() => {
    if (state.selectedText && state.selectedImage) {
      if (state.selectedText.text === state.selectedImage.text) {
        //console.log("it's a match");
        //setMatched([...matched, selectedText.text]);
        dispatch({
          type: GameActionTypes.MATCHED,
          payload: state.selectedText.text,
        });
      } else {
        // add red color
        console.log("Wrong!");
        //setWrong(true);
        dispatch({ type: GameActionTypes.WRONG, payload: true });
      }

      const timer = setTimeout(() => {
        /*
        setSelectedText(null);
        setSelectedImage(null);
        setWrong(false);*/
        dispatch({ type: GameActionTypes.RESET_SELECTION });
      }, 500);
      return () => clearTimeout(timer);
    } else {
      dispatch({ type: GameActionTypes.WRONG, payload: false });
    }
  }, [state.selectedImage, state.selectedText, state.wrong]);

  useEffect(() => {
    if (allMatched) {
      setShowOverlay(true);
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [allMatched]);
  //onClick={() => handleCardClick(words[randNum], Card_Types.TEXT)}
  //handleCardClick(words[randNum], Card_Types.IMAGE)
  return (
    <div>
      <h1>Games</h1>
      <div className="gameBoard">
        <div className="deck">
          {randomizer
            .filter((randNum) => randNum < words.length / 2)
            .map((randNum) => (
              <WordCard
                key={randNum}
                word={words[randNum]}
                type={Card_Types.TEXT}
                onClick={() =>
                  dispatch({
                    type: GameActionTypes.SELECTED_TEXT,
                    payload: words[randNum],
                  })
                }
                isSelected={state.selectedText?.text === words[randNum].text}
                isMatched={state.matched.includes(words[randNum].text)}
                disabled={
                  state.matched.includes(words[randNum].text) ||
                  (state.selectedText != null &&
                    state.selectedText.text !== words[randNum].text)
                }
                wrong={
                  state.selectedText?.text === words[randNum].text &&
                  state.wrong
                }
              />
            ))}
        </div>
        <div className="deck">
          {randomizer
            .filter((randNum) => randNum >= words.length / 2)
            .map((randNum) => (
              <WordCard
                key={randNum}
                word={words[randNum]}
                type={Card_Types.IMAGE}
                onClick={() =>
                  dispatch({
                    type: GameActionTypes.SELECTED_IMAGE,
                    payload: words[randNum],
                  })
                }
                isSelected={state.selectedImage?.text === words[randNum].text}
                isMatched={state.matched.includes(words[randNum].text)}
                disabled={
                  state.matched.includes(words[randNum].text) ||
                  (state.selectedImage != null &&
                    state.selectedImage.text !== words[randNum].text)
                }
                wrong={
                  state.selectedImage?.text === words[randNum].text &&
                  state.wrong
                }
              />
            ))}
        </div>
      </div>
      {showOverlay && (
        <div className=" overlay">
          <ConfettiExplosion
            particleCount={250}
            duration={4500}
            force={0.8}
            width={1200}
          />
          <h1>Good job! 🎉</h1>
          <img src="../images/medal.png" alt="Medal" style={{ width: "30%" }} />
        </div>
      )}
    </div>
  );
};

export default Games;
