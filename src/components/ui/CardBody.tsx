import type { JSX } from "react";
import type { CardBodyProps } from "../../interfaces";

export const CardBody = ({
  children,
  currentCard,
  loadingItemId,
  isFlipped,
}: CardBodyProps & { children?: JSX.Element }) => {
  const audio = currentCard && currentCard ? currentCard.audio : undefined;
  return (
    <>
      {/* Front Side */}
      <div
        className={`backface-visibility-hidden ${
          isFlipped ? "hidden" : "block"
        }`}
      >
        <div className="px-8 py-4">
          <h2 className="text-3xl text-purple-800 mb-3 leading-relaxed font-bold">
            {audio
              ? audio.translation
              : loadingItemId
                ? "Loading..."
                : "No data"}
          </h2>
          <p className="text-1xl pl-3 text-gray-800 italic">
            {audio ? audio.pivot : ""}
          </p>
        </div>
      </div>

      {/* Back Side */}
      <div className="transform-[rotateY(180deg)] backface-hidden invisible hidden">
        <div className="px-8 py-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {audio
              ? audio.transcript
              : loadingItemId
                ? "Loading..."
                : "No data"}
          </h2>
        </div>
      </div>

      {children}
    </>
  );
};
