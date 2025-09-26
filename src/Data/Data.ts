import type { VideoHomework, Word } from "../Model";
import { v4 as uuidv4 } from "uuid";

export const HOMEWORK_DATE = "2025-08-28";
export const DUE_DATE = "2025-08-30";

export const targetWords: Word[] = [
  { theme: "vegetable", text: "cabbage", image_url: "../images/cabbage.png" },
  { theme: "vegetable", text: "carrot", image_url: "../images/carrot.png" },
  { theme: "vegetable", text: "corn", image_url: "../images/corn.png" },
  { theme: "vegetable", text: "lettuce", image_url: "../images/lettuce.png" },
  { theme: "vegetable", text: "onion", image_url: "../images/onion.png" },
  { theme: "vegetable", text: "potato", image_url: "../images/potato.png" },
  { theme: "vegetable", text: "pumpkin", image_url: "../images/pumpkin.png" },
  { theme: "vegetable", text: "radish", image_url: "../images/radish.png" },
];

export const homework: VideoHomework[] = [
  {
    id: uuidv4(),
    title: "Fruit names",
    url: "https://www.youtube.com/embed/eBVqcTEC3zQ?si=sxI7BLVOdl9yYXa5",
    isWatched: false,
    dueDate: DUE_DATE,
  },
  {
    id: uuidv4(),
    title: "Homework name",
    url: "https://www.youtube.com/embed/W9rX6ApYqjo?si=yUudL6YR4yxqAyjc",
    isWatched: false,
    dueDate: DUE_DATE,
  },
  {
    id: uuidv4(),
    title: "Very very very very very long title",
    url: "https://www.youtube.com/embed/-GSnmRZlgc4?si=xgfzXlo-ah8qAstS",
    isWatched: false,
    dueDate: DUE_DATE,
  },
  {
    id: uuidv4(),
    title: "Story book",
    url: "https://www.youtube.com/embed/WFQIrd97t-Y?si=bIxyh0CRNYSkCVrt",
    isWatched: false,
    dueDate: DUE_DATE,
  },
];
