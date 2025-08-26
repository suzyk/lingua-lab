export interface VideoHomework {
  url: string;
  isWatched: boolean;
}

export interface Word {
  theme: string;
  text: string;
  audio_url?: string;
  image_url: string;
}

export enum Card_Types {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  COMPLETE = "COMPLETE",
}

// selecteText, selectedImage, cardMatched, matchWrong
export enum GameActionTypes {
  SELECTED_TEXT = "selectedText",
  SELECTED_IMAGE = "selectedImage",
  MATCHED = "matched",
  WRONG = "wrong",
  RESET_SELECTION = "resetSelection",
  SHOW_SCOREBOARD = "showScoreBoard",
  RESET_GAME = "resetGame",
}

export type GameAction =
  | { type: GameActionTypes.SELECTED_TEXT; payload: Word }
  | { type: GameActionTypes.SELECTED_IMAGE; payload: Word }
  | { type: GameActionTypes.MATCHED; payload: string }
  | { type: GameActionTypes.WRONG; payload: boolean }
  | { type: GameActionTypes.RESET_SELECTION }
  | { type: GameActionTypes.SHOW_SCOREBOARD; payload: boolean }
  | { type: GameActionTypes.RESET_GAME };

export interface WordGameState {
  words: Word[];
  selectedText: Word | null; // or number[], depending on your IDs
  selectedImage: Word | null;
  matched: string[];
  wrong: boolean;
  clickedCards: string[];
  showScoreBoard: boolean;
  randomizer: number[];
}
