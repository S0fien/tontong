import type { CardHeaderProps } from "../../interfaces";

export const CardHeader = ({
  currentCard,
  loadingItemId,
  isLoading,
}: CardHeaderProps) => {
  if (isLoading) {
    return null; // Loader is handled at the Card level
  }

  const audio = currentCard && currentCard ? currentCard.audio : undefined;
  return (
    <div className="px-8 pt-8">
      <h2 className="text-lg text-purple-600 mb-3 leading-relaxed">
        {audio ? audio.translation : loadingItemId ? "Loading..." : "No data"}
      </h2>
      <p className="text-lg text-purple-600 mb-3 leading-relaxed">
        {audio ? audio.pivot : ""}
      </p>
    </div>
  );
};
