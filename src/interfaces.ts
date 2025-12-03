export interface CardType {
  id: string;
  pivot: string;
  transcript: string;
  translation: string;
  audio: string; // public URL to the audio file
}


export interface JsonEntry {
  pivot: string;
  transcript: string;
  translation: string;
  start: number;
  end: number;
  duration: number;
}

export type CacheEntry = JsonEntry & {
  audio: string;
};

export interface IndexEntry {
  id: string;
  text: string;
  translation: string;
  audio: string; // public URL to the audio file
  folder: string;
  json: string;
  files: string[];
}
