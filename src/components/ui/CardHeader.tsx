import type { CardHeaderProps } from "../../interfaces";

export const CardHeader = ({
  currentCard,
  loadingItemId,
  isLoading,
}: CardHeaderProps) => {
  if (isLoading) {
    return null; // Loader is handled at the Card level
  }

  const  audio = currentCard && currentCard ? currentCard.audio : undefined;
  return (
    <div className="px-8 pt-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        {audio
          ? audio.translation
          : loadingItemId
          ? "Loading..."
          : "No data"}
      </h2>
      <p className="text-2xl text-gray-400">
        {audio ? audio.pivot : ""}
      </p>
    </div>
  );
};
