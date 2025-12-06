import { RotateCcw } from "lucide-react";
import type { CardFooterProps } from "../../interfaces";

export const CardFooter = ({
  isLoading,
  //   isFlipped,
  onFlip,
}: CardFooterProps) => {
  return (
    <div className="bg-purple-100/50 p-1 h-12 flex justify-end items-center">
      {!isLoading && (
        <button
          disabled={isLoading}
          onClick={onFlip}
          className="text-purple-400 hover:text-purple-600 transition p-2 mr-3"
          aria-label="Flip card"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
