import { Menu, Play } from "lucide-react";
import { useRef, useState } from "react";
import { Loader } from "../components/Loader";
import { Card } from "../components/ui/Card";
import { CardBody } from "../components/ui/CardBody";
import { CardFooter } from "../components/ui/CardFooter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/Pagination";
import useOutputIndex from "../hooks/useApp";

export default function History() {
  //   const [activeTab, setActiveTab] = useState("today");
  const [viewMode, setViewMode] = useState("both");
  // const [currentEntries, setCurrentEntries] = useState([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { indexList, itemsCache, loadingIndex } = useOutputIndex();

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const totalPages = Math.ceil(indexList.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const entries = indexList.slice(indexOfFirstEntry, indexOfLastEntry);
  // const ids = entries.map((entry) => entry.audio.json);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (loadingIndex) return <Loader />;

  return (
    <div className="w-[900px] max-w-[70wh] flex flex-col gap-4">
      <div className="h-2 bg-linear-to-r from-purple-600 to-purple-700"></div>

      {/* Controls */}

      <div className="bg-gray-50">
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Menu className="w-5 h-5 text-gray-600" />

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="viewMode"
                  value="both"
                  checked={viewMode === "both"}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-sm text-gray-700">Both</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="viewMode"
                  value="transcription"
                  checked={viewMode === "transcription"}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-sm text-gray-700">Transcription</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="viewMode"
                  value="translation"
                  checked={viewMode === "translation"}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-sm text-gray-700">Translation</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled
              className="px-4 py-2 border  border-gray-300 rounded-md opacity-30 cursor-not-allowed text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Play all
            </button>
          </div>
        </div>
        {/* Tabs */}
        {/* <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("today")}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === "today"
              ? "text-purple-600 border-b-2 border-purple-600 bg-white"
              : "text-gray-500 bg-gray-100"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setActiveTab("week")}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === "week"
              ? "text-purple-600 border-b-2 border-purple-600 bg-white"
              : "text-gray-500 bg-gray-100"
          }`}
        >
          This week
        </button>
        <button
          onClick={() => setActiveTab("month")}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === "month"
              ? "text-purple-600 border-b-2 border-purple-600 bg-white"
              : "text-gray-500 bg-gray-100"
          }`}
        >
          This month
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === "all"
              ? "text-purple-600 border-b-2 border-purple-600 bg-white"
              : "text-gray-500 bg-gray-100"
          }`}
        >
          All
        </button>
      </div> */}

        {/* Purple accent bar */}

        {/* Entries */}
        <div className="max-h-[500px] max-w-10xl w-full mx-auto p-6 space-y-6 overflow-auto">
          {loadingIndex && (
            <div>
              <Loader />
              <span>Loading entries...</span>
            </div>
          )}
          {!loadingIndex &&
            itemsCache &&
            itemsCache.length < 11 &&
            entries.map((entry) => {
              return (
                <div
                  key={entry.audio.json}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-l-lg"></div>

                  <div className="flex justify-end mb-4">
                    <span className="text-xs text-gray-400">{entry.id}</span>
                  </div>

                  <div className="flex justify-between py-3 ">
                    <Card
                      // header={
                      //   <CardHeader />
                      // }
                      footer={<CardFooter />}
                      body={<CardBody />}
                      isLoading={!entry}
                      loadingItemId={entry.id ?? ""}
                      currentCard={entry}
                    />
                    <button
                      onClick={handlePlay}
                      className={`${
                        isPlaying ? "bg-purple-600" : "bg-white"
                      } hover:bg-purple-100 ${
                        isPlaying ? "text-white" : "text-purple-700"
                      } rounded-full p-4 h-min m-auto shadow-xl transition transform hover:scale-110`}
                      aria-label={isPlaying ? "Pause audio" : "Play audio"}
                    >
                      <Play className="w-8 h-8" fill="currentColor" />
                    </button>
                    <audio
                      ref={audioRef}
                      src={`https://cjogyxlcgjmhhjzxigma.supabase.co/storage/v1/object/public/assets/${entry.id}-audio.ogg`}
                      onEnded={handleAudioEnded}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* Pagination */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="flex items-center justify-center gap-2">
          {/* <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button> */}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
              </PaginationItem>

              {[...Array(totalPages)]
                .slice(
                  currentPage === 1 ? currentPage : currentPage - 2,
                  currentPage + 2,
                )
                .map((_, index) => {
                  const page = index + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          currentPage === page
                            ? " text-black bg-purple-600"
                            : " text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              <PaginationItem>
                <PaginationNext onClick={() => goToPage(currentPage + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          {/* <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button> */}
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          Showing {indexOfFirstEntry + 1}-
          {Math.min(indexOfLastEntry, indexList.length)} of {indexList.length}{" "}
          entries
        </div>
      </div>
    </div>
  );
}
