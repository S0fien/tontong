import { Link } from "@tanstack/react-router";
import { FileText, History, List, MessageSquare, Smile } from "lucide-react";
import { Button } from "./ui/button";

export default function Menu() {
  return (
    <div
      className="bg-gray-200/20 backdrop-blur-2xl rounded-3xl p-4 w-full max-w-3xl shadow-2xl
"
    >
      <div className="grid grid-cols-2 gap-6">
        {/* Monologues - Large Card */}
        <Link to="/monologues" className="size-full">
          <Button
            variant={"brutal"}
            className="rounded-2xl p-3 flex flex-col size-full items-center justify-center  cursor-pointer"
          >
            <MessageSquare
              className="w-10 h-10 text-white mb-4"
              strokeWidth={2}
            />
            <h2 className="text-xl font-semibold text-white">Monologues</h2>
          </Button>
        </Link>

        {/* Right Column - Small Cards */}
        <div className="flex flex-col gap-6">
          {/* History Card */}
          <Link to="/history" className="size-full">
            <Button
              variant={"brutal"}
              className="rounded-2xl p-3 flex flex-col size-full items-center justify-center  cursor-pointer"
            >
              <History className="w-10 h-10 text-white mb-2" strokeWidth={2} />
              <h3 className="text-base font-medium text-white">History</h3>
            </Button>
          </Link>

          {/* Grammar Card */}
          <Link to="/grammar" className="size-full">
            <Button
              variant={"brutal"}
              className="rounded-2xl p-3 flex flex-col size-full items-center justify-center  cursor-pointer"
            >
              <List className="w-10 h-10 text-white mb-2" strokeWidth={2} />
              <h3 className="text-base font-medium text-white">Grammar</h3>
            </Button>
          </Link>
        </div>

        {/* Dialogues - Large Card */}
        <div className="bg-white/25 text-gray-400  cursor-not-allowed rounded-2xl p-3 flex flex-col items-center justify-center  ">
          <Smile className="w-10 h-10 mb-4" strokeWidth={2} />
          <h2 className="text-xl font-semibold">Dialogues</h2>
        </div>

        {/* Contents Card */}
        <div className="bg-white/25 text-gray-400 cursor-not-allowed rounded-2xl p-3 flex flex-col items-center justify-center  ">
          <FileText className="w-10 h-10  mb-2" strokeWidth={2} />
          <h3 className="text-base font-medium ">Contents</h3>
        </div>
      </div>
    </div>
  );
}
