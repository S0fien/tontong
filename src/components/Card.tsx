import { RotateCcw } from "lucide-react";
import type { CardType } from "../interfaces";

export const Card = ({
  currentCard,
  loadingItemId,
  handleReset,
}: {
  currentCard: CardType;
  loadingItemId: string;
  handleReset: () => void;
}) => {
  return (
    <div className="w-full max-w-4xl justify-center">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Card Content */}
        <div className="p-12 min-h-[200px] flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {currentCard
              ? currentCard.translation
              : loadingItemId
              ? "Loading..."
              : "No data"}
          </h2>
          <p className="text-2xl text-gray-400">
            {currentCard ? currentCard.pivot : ""}
          </p>
        </div>

        {/* Card Footer */}
        <div className="bg-purple-100/50 p-6 flex justify-between items-center">
          <div className="flex-1"></div>
          <button
            onClick={handleReset}
            className="text-purple-400 hover:text-purple-600 transition p-2"
            aria-label="Reset audio"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
