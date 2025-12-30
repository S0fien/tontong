import { RotateCcw } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import type { CardFooterProps } from "../../interfaces";
import { cn } from "../../lib/utils";

export const CardFooter = ({
  isLoading,
  //   isFlipped,
  onFlip,
  children,
  className,
}: CardFooterProps & { children?: ReactElement; className?: string }) => {
  const childs = children?.props as {
    children: ReactNode[];
    className: string;
  };
  const list = childs?.children;
  const { className: classy } = childs;

  return (
    <div
      className={cn(
        "bg-purple-100/50 px-1 py-3 h-max-22 flex relative justify-end items-center",
        className,
      )}
    >
      {!isLoading && (
        <>
          <button
            disabled={isLoading}
            onClick={onFlip}
            className="absolute top-0 right-2 text-purple-400 hover:text-purple-600 transition p-2 mr-3"
            aria-label="Flip card"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          {classy && list && (
            <div className={classy}>
              {list.map((el) => (
                <>{el}</>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
