import React from "react";
import useOutputIndex from "../hooks/useOutputIndex";
import MonologueDetail from "./MonologueDetail";

const Monologues: React.FC = () => {
  const { itemsCache, loadingIndex } = useOutputIndex();

  if (loadingIndex || Object.entries(itemsCache).length === 0) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit">
      <MonologueDetail />
      {/* Main Card */}
      {/* <Card
        isLoading={
          loadingIndex || !currentEntry || !itemsCache[currentEntry.id]
        }
        loadingItemId={loadingItemId ?? ""}
        currentCard={currentCard!}
      /> */}
    </div>
  );
};

export default Monologues;
