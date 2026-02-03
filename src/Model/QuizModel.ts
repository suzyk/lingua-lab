import type { GameActionTypes, Word } from "./Model";

export interface QuizState {
  words: Word[];
  selectedImage: Word | null;
  wrong: boolean;
  randomizedWords: number[]; // for the order of quiz question
  score: number;
  feedback: "correct" | "wrong" | null;
}
//timer

export enum QuizActionTypes {
  SELECTED_TEXT = "selectedText",
  SELECTED_IMAGE = "selectedImage",
  MATCHED = "matched",
  WRONG = "wrong",
  RESET_SELECTION = "resetSelection",
  SHOW_SCOREBOARD = "showScoreBoard",
  RESET_GAME = "resetGame",
}

export type QuizAction =
  | { type: GameActionTypes.SELECTED_TEXT; payload: Word }
  | { type: GameActionTypes.SELECTED_IMAGE; payload: Word }
  | { type: GameActionTypes.MATCHED; payload: string }
  | { type: GameActionTypes.WRONG; payload: boolean }
  | { type: GameActionTypes.RESET_SELECTION }
  | { type: GameActionTypes.SHOW_SCOREBOARD; payload: boolean }
  | { type: GameActionTypes.RESET_GAME };
