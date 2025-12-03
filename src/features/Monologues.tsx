import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "../components/Card";
import useOutputIndex from "../hooks/useOutputIndex";
import type { CardType } from "../interfaces";

const Monologues: React.FC = () => {
  // index.json (list of folders) and per-item cache
  const { indexList, itemsCache, loadingIndex, loadingItemId } =
    useOutputIndex();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentEntry = indexList[currentIndex];
  const currentCard: CardType | null =
    currentEntry && itemsCache[currentEntry.id]
      ? {
          id: currentEntry.id,
          transcript: itemsCache[currentEntry.id].transcript ?? "",
          pivot: itemsCache[currentEntry.id].pivot ?? "",
          translation: itemsCache[currentEntry.id].translation ?? "",
          audio: currentEntry.audio
            ? `/output/${currentEntry.audio}`
            : `/output/${currentEntry.folder}/${
                itemsCache[currentEntry.id].audio ?? ""
              }`,
        }
      : null;

  const stopAudio = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePrevious = (): void => {
    stopAudio();
    setIsPlaying(false);
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : indexList.length ? indexList.length - 1 : 0
    );
  };

  const handleNext = (): void => {
    stopAudio();
    setIsPlaying(false);
    setCurrentIndex((prev) =>
      prev < (indexList.length ? indexList.length - 1 : 0) ? prev + 1 : 0
    );
  };

  const handlePlay = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = (): void => {
    setIsPlaying(false);
  };

  // Lazy-load the JSON for the current item when currentEntry changes
  useEffect(() => {
    if (!currentEntry) return;
    if (itemsCache[currentEntry.id]) return; // already loaded
  }, [currentEntry, itemsCache]);

  if (loadingIndex) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit">
      {/* Main Card */}
      <Card loadingItemId={loadingItemId ?? ""} currentCard={currentCard!} />

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 gap-8">
        <button
          onClick={handlePrevious}
          className="bg-white hover:bg-purple-100 text-purple-700 rounded-full p-4 shadow-lg transition transform hover:scale-110"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handlePlay}
          className={`${
            isPlaying ? "bg-purple-600" : "bg-white"
          } hover:bg-purple-100 ${
            isPlaying ? "text-white" : "text-purple-700"
          } rounded-full p-4 shadow-xl transition transform hover:scale-110`}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          <Play className="w-8 h-8" fill="currentColor" />
        </button>

        <button
          onClick={handleNext}
          className="bg-white hover:bg-purple-100 text-purple-700 rounded-full p-4 shadow-lg transition transform hover:scale-110"
          aria-label="Next card"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="flex flex-col justify-center items-center gap-2 mt-4">
        {/* {indexList.map((_, index) => (
            <DotIcon
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))} */}
        <p>
          Entry {currentIndex} on {indexList.length} entries.
        </p>
      </div>
      {/* </div> */}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentCard?.audio}
        onEnded={handleAudioEnded}
      />
    </div>
  );
};

export default Monologues;
