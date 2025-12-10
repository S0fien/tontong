export interface CardType {
  id?: string;
  word: any;
  phone: any;
  audio: any; // public URL to the audio file
}

export interface PhoneType {
  phone: any;
  start: number;
  end: number;
  duration: number;
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
  currentCard?: CardType | undefined;
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
  audio: any;
  word: any;
  phone: PhoneType[];
};

export interface IndexEntry {
  id: string;
  text: string;
  word: any;
  phone: any;
  audio: any; // public URL to the audio file
  transcript: string;
  pivot: string;
  translation: string;
  folder: string;
  json: string;
  files: string[];
}
