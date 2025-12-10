import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Phonograph from "../components/Phonograph";
import { Card } from "../components/ui/Card";
import { CardBody } from "../components/ui/CardBody";
import { CardFooter } from "../components/ui/CardFooter";
import useOutputIndex from "../hooks/useApp";
import type { CardType } from "../interfaces";

const MonologueDetail = () => {
  const { id: idParam } = useParams({ strict: false });

  console.log("id param", idParam);
  const navigate = useNavigate();
  const { indexList, itemsCache, loadItem, currentEntry, loadingItemId } =
    useOutputIndex();
  const id = idParam || indexList[0];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("itemscache", itemsCache);
  // Find the entry and its data
  // const currentEntry = /indexList.find((e) => e.id === id);
  console.log("useIfFeting", currentEntry, loadingItemId);
  const currentCard: CardType | undefined = currentEntry
    ? {
        audio: {
          ...currentEntry.audio,
          path: `https://cjogyxlcgjmhhjzxigma.supabase.co/storage/v1/object/public/assets/${id}-audio.ogg`,
        },
        phone: currentEntry.phone,
        word: currentEntry.word,
      }
    : undefined;

  console.log("currentcard", currentCard);
  // Load the item's data on mount
  useEffect(() => {

    if (loadingItemId === "null" || !loadingItemId) return;
loadItem(loadingItemId);
  }, [currentEntry, itemsCache, loadItem, loadingItemId]);

  const handlePrevious = () => {
    const currentIdx = indexList.findIndex((e) => e.id === id);
    if (currentIdx > 0) {
      navigate({ to: `/monologues/${indexList[currentIdx - 1].id}` });
    } else if (indexList.length > 0) {
      navigate({ to: `/monologues/${indexList[indexList.length - 1].id}` });
    }
  };

  const handleNext = () => {
    const currentIdx = indexList.findIndex((e) => e.id === id);
    if (currentIdx < indexList.length - 1) {
      navigate({ to: `/monologues/${indexList[currentIdx + 1].id}` });
    } else if (indexList.length > 0) {
      navigate({ to: `/monologues/${indexList[0].id}` });
    }
  };

  const handlePlay = () => {
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

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  console.log(currentCard);
  if (!currentEntry || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-purple-700 via-purple-600 to-pink-500">
        <div className="text-white text-2xl">Monologue not found</div>
      </div>
    );
  }

  const currentIdx = indexList.findIndex((e) => e.id === id);

  return (
    <div className="min-h-screen py-8 relative  flex flex-col justify-center items-center w-full">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate({ to: "/monologues" })}
          className="bg-white hover:bg-purple-100 text-purple-700 rounded-full p-3 shadow-lg transition transform hover:scale-110"
          aria-label="Back to list"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Main Card */}
      <Card
        // header={
        //   <CardHeader />
        // }
        footer={<CardFooter />}
        body={<CardBody />}
        isLoading={!currentEntry}
        loadingItemId={currentEntry.id ?? ""}
        currentCard={currentCard}
      />

      {/* Navigation Buttons */}
      <div className="flex w-[500px] mx-auto justify-around items-center mt-8">
        <button
          onClick={handlePrevious}
          className="bg-white hover:bg-purple-100 text-purple-700 rounded-full p-4 shadow-lg transition transform hover:scale-110"
          aria-label="Previous monologue"
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
          aria-label="Next monologue"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="flex flex-col fixed bottom-3 justify-center items-center gap-2">
        <p className="text-white text-sm">
          Monologue {currentIdx + 1} of {indexList.length}
        </p>
      </div>

      <Phonograph phones={currentCard?.phone || []} />

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentCard?.audio.path}
        onEnded={handleAudioEnded}
      />
    </div>
  );
};

export default MonologueDetail;
