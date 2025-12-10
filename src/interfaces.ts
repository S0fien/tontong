export interface AudioFileType {
  start: number;
  end: number;
  duration: number;
}

export type AudioType = {
  transcript: string;
  pivot: string;
  translation: string;
  json: string;
  path?: string;
} & AudioFileType;

export type WordType = {
  word: string;
} & AudioFileType;

export interface CardType {
  id: string;
  word: WordType[];
  phone: PhoneType[];
  audio: AudioType;
}

export interface PhoneType {
  phone: string;
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
