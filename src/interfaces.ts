export interface CardType {
  id: string;
  pivot: string;
  transcript: string;
  translation: string;
  audio: string; // public URL to the audio file
}

export interface CardFooterProps {
  isLoading?: boolean;
  isFlipped?: boolean;
  onFlip?: () => void;
}
export interface CardHeaderProps {
  currentCard?: CardType | null;
  loadingItemId?: string;
  isLoading?: boolean;
}

export interface CardBodyProps {
  currentCard?: CardType | null;
  loadingItemId?: string;
  isFlipped?: boolean;
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
