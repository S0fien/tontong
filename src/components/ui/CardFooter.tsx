import { RotateCcw } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import type { CardFooterProps } from "../../interfaces";

export const CardFooter = ({
  isLoading,
  //   isFlipped,
  onFlip,
  children,
}: CardFooterProps & { children?: ReactElement }) => {
  console.log("props", children);
  const childs = children?.props as {
    children: ReactNode[];
    className: string;
  };
  console.log("childs", childs);
  const list = childs?.children;
  console.log("list", list);
  const { className } = childs;
  console.log("classnale", className);
  return (
    <div className="bg-purple-100/50 px-1 pt-1 pb-10 h-max-22 flex relative justify-end items-center">
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
          {className && list && (
            <div className={className}>
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
