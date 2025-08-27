import { useEffect, useReducer } from "react";
import WordCard from "../Components/WordCard";
import { Card_Types, GameActionTypes } from "../Model"; // runtime values
import type { Word, GameAction, WordGameState } from "../Model"; // types only
import { randomNoRepeats } from "../Util/Util";
import GameScore from "../Components/GameScore";
import { targetWords } from "../data/targetWords";

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
    case GameActionTypes.SHOW_SCOREBOARD: {
      console.log("show scoreboard");
      return {
        ...state,
        showScoreBoard: action.payload,
      };
    }
    case GameActionTypes.RESET_GAME: {
      console.log("reset the whole game");
      // reset everything to the initial State and mix the cards again.
      return {
        ...state,
        selectedText: null,
        selectedImage: null,
        matched: [],
        wrong: false,
        clickedCards: [], //status: 'idle' | 'checking' | 'complete'
        showScoreBoard: false,
        randomizer: randomNoRepeats(state.words.length),
      };
    }
    default:
      return state;
  }
};

const WordGame = () => {
  const words: Word[] = [...targetWords]; // targetWords; This points to the reference to the array
  // double the words for text cards and image cards.
  words.push.apply(words, words);

  const initialState: WordGameState = {
    words: words,
    selectedText: null,
    selectedImage: null,
    matched: [],
    wrong: false,
    clickedCards: [], //status: 'idle' | 'checking' | 'complete'
    showScoreBoard: false,
    randomizer: randomNoRepeats(words.length),
  };

  const [state, dispatch] = useReducer(wordReducer, initialState); // set default
  // ()=> fn() : lazy initialization
  //() => fn() wrapper: it delays evaluation until React needs the initial state & runs once.
  //const [randomizer] = useState(() => randomNoRepeats(words.length));
  //const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const allMatched = words.length / 2 === state.matched.length;

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
  }, [state.selectedImage, state.selectedText]);

  useEffect(() => {
    if (allMatched) {
      dispatch({ type: GameActionTypes.SHOW_SCOREBOARD, payload: true });
      //setShowOverlay(true);
      // const timer = setTimeout(() => {
      //   setShowOverlay(false);
      // }, 3000);
      // return () => clearTimeout(timer);
    }
  }, [allMatched]);
  //onClick={() => handleCardClick(words[randNum], Card_Types.TEXT)}
  //handleCardClick(words[randNum], Card_Types.IMAGE)

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="header">Word Games</h1>
      <div className="gameBoard gameMode">
        {state.showScoreBoard ? (
          <div className="flex items-center justify-center w-full h-full">
            <GameScore score={100} dispatch={dispatch} />
          </div>
        ) : (
          <>
            <div className="deck">
              {state.randomizer
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
                    isSelected={
                      state.selectedText?.text === words[randNum].text
                    }
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
              {state.randomizer
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
                    isSelected={
                      state.selectedImage?.text === words[randNum].text
                    }
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
          </>
        )}
      </div>
    </div>
  );
};

export default WordGame;
