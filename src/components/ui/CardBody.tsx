import type { CardBodyProps } from "../../interfaces";

export const CardBody = ({
  currentCard,
  loadingItemId,
  isFlipped,
}: CardBodyProps) => {
  return (
    <>
      {/* Front Side */}
      <div
        className={`backface-visibility-hidden ${
          isFlipped ? "hidden" : "block"
        }`}
      >
        <div className="px-8 py-4">
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
      </div>

      {/* Back Side */}
      <div className="transform-[rotateY(180deg)] backface-hidden">
        <div className="px-8 py-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {currentCard
              ? currentCard.transcript
              : loadingItemId
              ? "Loading..."
              : "No data"}
          </h2>
        </div>
      </div>
    </>
  );
};
