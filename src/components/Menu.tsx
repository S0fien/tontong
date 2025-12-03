import { Link } from "@tanstack/react-router";
import { FileText, History, List, MessageSquare, Smile } from "lucide-react";

export default function Menu() {
  return (
    <div className="bg-gray-200 rounded-3xl p-4 w-full max-w-2xl shadow-2xl">
      <div className="grid grid-cols-2 gap-6">
        {/* Monologues - Large Card */}
        <Link
          to="/monologues"
          className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <MessageSquare
            className="w-10 h-10 text-purple-600 mb-4"
            strokeWidth={2}
          />
          <h2 className="text-xl font-semibold text-purple-600">Monologues</h2>
        </Link>

        {/* Right Column - Small Cards */}
        <div className="flex flex-col gap-6">
          {/* History Card */}
          <Link
            to="/history"
            className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow "
          >
            <History
              className="w-10 h-10 text-purple-600 mb-2"
              strokeWidth={2}
            />
            <h3 className="text-base font-medium text-purple-600">History</h3>
          </Link>

          {/* Grammar Card */}
          <div className="bg-white/25 cursor-not-allowed rounded-2xl p-3 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow ">
            <List className="w-10 h-10 text-purple-600 mb-2" strokeWidth={2} />
            <h3 className="text-base font-medium text-purple-600">Grammar</h3>
          </div>
        </div>

        {/* Dialogues - Large Card */}
        <div className="bg-white/25 cursor-not-allowed rounded-2xl p-3 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow ">
          <Smile className="w-10 h-10 text-purple-600 mb-4" strokeWidth={2} />
          <h2 className="text-xl font-semibold text-purple-600">Dialogues</h2>
        </div>

        {/* Contents Card */}
        <div className="bg-white/25 cursor-not-allowed rounded-2xl p-3 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow ">
          <FileText
            className="w-10 h-10 text-purple-600 mb-2"
            strokeWidth={2}
          />
          <h3 className="text-base font-medium text-purple-600">Contents</h3>
        </div>
      </div>
    </div>
  );
}
