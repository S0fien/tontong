import { AccordionContent } from "@radix-ui/react-accordion";
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Play,
  Volume2,
} from "lucide-react";
import { useRef, useState } from "react";
import { Loader } from "../components/Loader";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/Accordeon";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/Card";
import { CardBody } from "../components/ui/CardBody";
import { CardFooter } from "../components/ui/CardFooter";
import { GRAMMAR } from "../constants";
import useOutputIndex from "../hooks/useApp";

interface Grammar {
  id: string;
  title: string;
  examples: string[];
}

const soso = Object.values(GRAMMAR);

const ddsq = Array.from(
  new Set(
    Object.entries(GRAMMAR).map((curr) => {
      const entry = curr[1] as unknown as { metacategory: string };
      return entry.metacategory;
    }),
  ),
);

const Grammar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { indexList } = useOutputIndex();
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

  const markComplete = (topicId: string) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    setCompletedTopics(newCompleted);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="bg-purple-950/50 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">
                Grammar Explorer
              </h1>
            </div>
            <div className="text-purple-200 text-sm">
              {completedTopics.size} topics completed
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Level Selector */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">CEFR Level</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {ddsq.map((level, indox) => {
              const lul = indexList[indox];
              if (!lul) return;
              const lil = lul.id.slice(0, 6);
              return (
                <Button
                  onClick={() => {
                    document.getElementById("grammar" + indox)?.scrollIntoView({
                      inline: "start",
                      block: "center",
                      behavior: "smooth",
                    });
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br opacity-90`}
                  />
                  <div className="relative z-10">
                    <div className="text-xl font-bold text-white mb-1">
                      {level} {lil}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Categories and Topics */}
        <div className="space-y-6">
          {ddsq.map((data, index) => {
            return (
              <div
                key={index}
                id={`grammar${index}`}
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden"
              >
                <div className="bg-linear-to-r from-purple-600/50 to-pink-600/50 px-6 py-4 border-b border-white/20">
                  <h3 className="text-xl font-bold text-black">
                    {index + 1}. {data}
                  </h3>
                </div>
                <div className="divide-y divide-white/10">
                  {soso
                    .filter(
                      (item) =>
                        (item as { metacategory: string }).metacategory ===
                        data,
                    )
                    .map((item, ix) => {
                      const { cefr, category } = item;
                      const isCompleted = completedTopics.has(cefr);

                      const dqsdsd = indexList[ix];
                      if (!dqsdsd) return <Loader />;

                      return (
                        <Accordion collapsible type="single" key={ix}>
                          <AccordionItem value={`${ix}`}>
                            <AccordionTrigger>
                              <div className="flex items-center gap-4">
                                <ChevronRight
                                  className={`w-5 h-5 transition-transform`}
                                />
                                <span className=" font-mono text-sm">
                                  {cefr}
                                </span>
                                <span className="text-gray-900 font-medium group-hover:text-gray-700 transition-colors">
                                  {category}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markComplete(category);
                                  }}
                                  className={`p-1 rounded transition-colors ${
                                    isCompleted
                                      ? "text-green-400"
                                      : "text-white/30 hover:text-white/60"
                                  }`}
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    alert("Audio playback would start here");
                                  }}
                                  className="p-1 text-white/50 hover:text-white transition-colors"
                                >
                                  <Volume2 className="w-5 h-5" />
                                </button>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="px-6">
                                <div className="space-y-3">
                                  {category && (
                                    <div className="flex justify-between py-3 ">
                                      <Card
                                        // header={
                                        //   <CardHeader />
                                        // }
                                        footer={<CardFooter />}
                                        body={<CardBody />}
                                        isLoading={!dqsdsd}
                                        loadingItemId={dqsdsd.id ?? ""}
                                        currentCard={dqsdsd}
                                      />
                                      <button
                                        onClick={handlePlay}
                                        className={`${
                                          isPlaying
                                            ? "bg-purple-600"
                                            : "bg-white"
                                        } hover:bg-purple-100 ${
                                          isPlaying
                                            ? "text-white"
                                            : "text-purple-700"
                                        } rounded-full p-4 h-min m-auto shadow-xl transition transform hover:scale-110`}
                                        aria-label={
                                          isPlaying
                                            ? "Pause audio"
                                            : "Play audio"
                                        }
                                      >
                                        <Play
                                          className="w-8 h-8"
                                          fill="currentColor"
                                        />
                                      </button>
                                      <audio
                                        ref={audioRef}
                                        src={`https://cjogyxlcgjmhhjzxigma.supabase.co/storage/v1/object/public/assets/${dqsdsd.id}-audio.ogg`}
                                        onEnded={handleAudioEnded}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-8 bg-linear-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Your Progress
              </h3>
              <p className="text-purple-200">
                Keep learning and track your completed topics
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">
                {Math.round((completedTopics.size / 12) * 100)}%
              </div>
              <div className="text-sm text-purple-200">Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grammar;
