import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "../components/Card";
import type { CacheEntry, CardType, IndexEntry } from "../interfaces";

const Monologues: React.FC = () => {
  // index.json (list of folders) and per-item cache
  const [indexList, setIndexList] = useState<IndexEntry[]>([]);
  const [itemsCache, setItemsCache] = useState<Record<string, CacheEntry>>({});
  const [loadingIndex, setLoadingIndex] = useState<boolean>(true);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleReset = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = (): void => {
    setIsPlaying(false);
  };

  // Load the index.json once on mount
  useEffect(() => {
    let mounted = true;
    async function loadIndex() {
      try {
        const indexResp = await fetch("/output/index.json");
        if (!indexResp.ok)
          throw new Error(`Failed to fetch index.json: ${indexResp.status}`);
        const index = await indexResp.json();
        if (!mounted) return;
        setIndexList(index || []);
        setLoadingIndex(false);

        // load only the first item lazily
        if (index && index[0] && index[0].json) {
          setLoadingItemId(index[0].id);
          try {
            const it = await fetch(`/output/${index[0].json}`);
            if (it.ok) {
              const d = await it.json();
              if (mounted) setItemsCache((p) => ({ ...p, [index[0].id]: d }));
            }
          } catch (e) {
            console.warn("Failed to load initial item", e);
          } finally {
            if (mounted) setLoadingItemId(null);
          }
        }
      } catch (err: unknown) {
        console.error(err);
        if (mounted) {
          setError(String(err));
          setLoadingIndex(false);
        }
      }
    }
    loadIndex();
    return () => {
      mounted = false;
    };
  }, []);

  // Lazy-load the JSON for the current index when user navigates
  useEffect(() => {
    let mounted = true;
    async function loadCurrent() {
      if (!indexList || !indexList.length) return;
      const entry = indexList[currentIndex];
      if (!entry) return;
      if (itemsCache[entry.id]) return; // already loaded
      if (!entry.json) return;
      try {
        setLoadingItemId(entry.id);
        const it = await fetch(`/output/${entry.json}`);
        if (!it.ok)
          throw new Error(`Failed to fetch ${entry.json}: ${it.status}`);
        const d = await it.json();
        if (!mounted) return;
        setItemsCache((p) => ({ ...p, [entry.id]: d }));
      } catch (e) {
        console.warn("Failed to load item", e);
      } finally {
        if (mounted) setLoadingItemId(null);
      }
    }
    loadCurrent();
    return () => {
      mounted = false;
    };
  }, [currentIndex, indexList]);

  if (loadingIndex) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-white text-2xl">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit">
      {/* Main Card */}
      <Card
        loadingItemId={loadingItemId ?? ""}
        currentCard={currentCard!}
        handleReset={handleReset}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center mt-8 gap-8">
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
      <div className="flex flex-col justify-center items-center gap-2 mt-8">
        {/* {indexList.map((_, index) => (
            <DotIcon
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))} */}
        <p>Entry {currentIndex}.</p>
        <p>There is {indexList.length} entry.</p>
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
