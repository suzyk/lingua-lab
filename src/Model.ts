export interface VideoHomework {
  url: string;
  isWatched: boolean;
}

export interface Word {
  text: string;
  audio_url?: string;
  image_url: string;
}

export enum Card_Types {
  TEXT,
  IMAGE,
}
