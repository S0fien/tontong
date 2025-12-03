import { FileText, History, List, MessageSquare, Smile } from "lucide-react";

export default function Menu() {
  return (
    <>
      <div className="bg-gray-200 rounded-3xl p-12 w-full max-w-2xl shadow-2xl">
        <div className="grid grid-cols-2 gap-6">
          {/* Monologues - Large Card */}
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <MessageSquare
              className="w-16 h-16 text-purple-600 mb-4"
              strokeWidth={2}
            />
            <h2 className="text-xl font-semibold text-purple-600">
              Monologues
            </h2>
          </div>

          {/* Right Column - Small Cards */}
          <div className="flex flex-col gap-6">
            {/* History Card */}
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <History
                className="w-10 h-10 text-purple-600 mb-2"
                strokeWidth={2}
              />
              <h3 className="text-base font-medium text-purple-600">History</h3>
            </div>

            {/* Grammar Card */}
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <List
                className="w-10 h-10 text-purple-600 mb-2"
                strokeWidth={2}
              />
              <h3 className="text-base font-medium text-purple-600">Grammar</h3>
            </div>
          </div>

          {/* Dialogues - Large Card */}
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <Smile className="w-16 h-16 text-purple-600 mb-4" strokeWidth={2} />
            <h2 className="text-xl font-semibold text-purple-600">Dialogues</h2>
          </div>

          {/* Contents Card */}
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <FileText
              className="w-10 h-10 text-purple-600 mb-2"
              strokeWidth={2}
            />
            <h3 className="text-base font-medium text-purple-600">Contents</h3>
          </div>
        </div>
      </div>
    </>
  );
}
