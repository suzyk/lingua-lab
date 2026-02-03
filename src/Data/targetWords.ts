import type { Word } from "../Model/Model";

// loads all .png images in flashcards (recursive)
// glob returns an object, not an array, of {key(path) and value(module)}
/*
{
  "../assets/flashcards/fruits/apple.png": { default: "/assets/apple-12ab34.png" },
  "../assets/flashcards/fruits/banana.png": { default: "/assets/banana-56cd78.png" },
  "../assets/flashcards/animals/cat.png": { default: "/assets/cat-78ef90.png" }
}
*/
const images = import.meta.glob<{ default: string }>(
  "../assets/flashcards/emotion/*.png",
  {
    eager: true, // import everything right away instead of lazily.
  }
);

// convert into usable array
// import the files immediately at build time.
// each entry is a module object.
// Object.entries returns [key, value] pairs
export const flashcards = Object.entries(images).map(([path, mod]) => {
  const parts = path.split("/");
  const filename = parts.pop()?.replace(".png", "");
  const category = parts.pop();

  return {
    category,
    text: filename,
    image_url: mod.default,
  } as Word;
});

/*
const targetWords = Object.entries(images).map(([path, mod]) => ({
  name: path.split("/").pop()?.replace(".png", ""), // e.g. "apple"
  src: mod.default,
}));
*/

/*
// reading from public/images
const iamgeUrlBase = "../assets/flashcards/";
export const targetWords: Word[] = [
  {
    category: "vegetable",
    text: "cabbage",
    image_url: `${iamgeUrlBase}vegetable/cabbage.png`,
  },
  {
    category: "vegetable",
    text: "carrot",
    image_url: `${iamgeUrlBase}vegetable/carrot.png`,
  },
  {
    category: "vegetable",
    text: "corn",
    image_url: `${iamgeUrlBase}vegetable/corn.png`,
  },
  {
    category: "vegetable",
    text: "lettuce",
    image_url: `${iamgeUrlBase}vegetable/lettuce.png`,
  },
  {
    category: "vegetable",
    text: "onion",
    image_url: `${iamgeUrlBase}vegetable/onion.png`,
  },
  {
    category: "vegetable",
    text: "potato",
    image_url: `${iamgeUrlBase}vegetable/potato.png`,
  },
  {
    category: "vegetable",
    text: "pumpkin",
    image_url: `${iamgeUrlBase}vegetable/pumpkin.png`,
  },
  {
    category: "vegetable",
    text: "radish",
    image_url: `${iamgeUrlBase}vegetable/radish.png`,
  },
];
*/
