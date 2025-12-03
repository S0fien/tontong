import { LoaderCircle, Menu, MessageCircle, Play } from "lucide-react";
import { useEffect, useState } from "react";
import useOutputIndex from "../hooks/useOutputIndex";

export default function History() {
  //   const [activeTab, setActiveTab] = useState("today");
  const [viewMode, setViewMode] = useState("both");
  // const [currentEntries, setCurrentEntries] = useState([]);

  const { indexList, itemsCache, loadingIndex, loadItem, loadItems } =
    useOutputIndex();

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const totalPages = Math.ceil(indexList.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const entries = indexList.slice(indexOfFirstEntry, indexOfLastEntry);

  console.log("entries", entries);
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const ids = entries.map((entry) => entry.id);
    loadItems(ids);
  }, [entries, loadItems]);

  return (
    <div className="w-[900px] max-w-[70wh] flex flex-col gap-4">
      <div className="h-2 bg-gradient-to-r from-purple-600 to-purple-700"></div>

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
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
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
          {loadingIndex && <div>Loading entries...</div>}
          {!loadingIndex &&
            entries.map((entry) => {
              const cached = itemsCache[entry.id];
              console.log("Cached data:", itemsCache, itemsCache);
              const english = cached ? cached.transcript ?? "" : "";
              const french = cached ? cached.translation ?? "" : "";
              const literal = cached ? cached.pivot ?? "" : "";

              if (!cached)
                return (
                  <div>
                    <LoaderCircle
                      size="20"
                      color="purple"
                      className="m-auto animate-spin"
                    />
                    ;
                  </div>
                );
              return (
                <div
                  key={entry.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-l-lg"></div>

                  <div className="flex justify-end mb-4">
                    <span className="text-xs text-gray-400">{entry.id}</span>
                  </div>

                  {(viewMode === "both" || viewMode === "translation") && (
                    <p className="text-lg text-purple-600 mb-3 leading-relaxed">
                      {english || (cached ? "—" : "No transcript loaded")}
                    </p>
                  )}

                  {(viewMode === "both" || viewMode === "transcription") && (
                    <p className="text-base text-gray-400 italic mb-3 leading-relaxed">
                      {french || (cached ? "—" : "No translation loaded")}
                    </p>
                  )}

                  {literal && (
                    <p className="text-base text-gray-700 leading-relaxed">
                      {literal}
                    </p>
                  )}

                  <div className="absolute bottom-4 right-4 flex gap-3">
                    <button
                      onClick={() => loadItem(entry.id)}
                      className="px-3 py-2 bg-gray-100 rounded-md text-sm"
                    >
                      Load
                    </button>
                    <button className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors">
                      <MessageCircle
                        className="w-6 h-6 text-white"
                        fill="white"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* Pagination */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {[...Array(totalPages)]
            .slice(
              currentPage === 1 ? currentPage : currentPage - 2,
              currentPage + 2
            )
            .map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-purple-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
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
