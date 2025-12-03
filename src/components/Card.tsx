import { RotateCcw } from "lucide-react";
import { useState } from "react";
import type { CardType } from "../interfaces";

export const Card = ({
  currentCard,
  loadingItemId,
}: {
  currentCard: CardType;
  loadingItemId: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-2xl justify-center">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden [perspective:1000px]">
        {/* Card Content with Flip */}
        <div
          className={`p-8 min-h-[200px] flex flex-col justify-center transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front Side */}
          <div
            className={`[backface-visibility:hidden] ${
              isFlipped ? "hidden" : "block"
            }`}
          >
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

          {/* Back Side */}
          <div className="[transform:rotateY(180deg)] [backface-visibility:hidden]">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {currentCard
                ? currentCard.transcript
                : loadingItemId
                ? "Loading..."
                : "No data"}
            </h2>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-purple-100/50 p-1 flex justify-end items-center">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="text-purple-400 hover:text-purple-600 transition p-2 mr-3"
            aria-label="Flip card"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
