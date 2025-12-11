import React, { useState } from "react";
import type {
  CardBodyProps,
  CardFooterProps,
  CardHeaderProps,
  CardType,
} from "../../interfaces";
import { Loader } from "../Loader";

export const Card = ({
  currentCard,
  loadingItemId,
  isLoading,
  header,
  body,
  footer,
}: {
  currentCard?: CardType;
  loadingItemId?: string;
  isLoading: boolean;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
} & Partial<HTMLDivElement>) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Header = header
    ? React.cloneElement(header as React.ReactElement<CardHeaderProps>, {
        currentCard,
        isLoading,
        loadingItemId,
      })
    : null;
  const Body = body
    ? React.cloneElement(body as React.ReactElement<CardBodyProps>, {
        currentCard,
        loadingItemId,
        isFlipped,
      })
    : null;
  const Footer = footer
    ? React.cloneElement(footer as React.ReactElement<CardFooterProps>, {
        isLoading,
        onFlip: () => setIsFlipped(!!isFlipped),
        isFlipped,
      })
    : null;
  return (
    <div className="w-full max-w-2xl justify-center">
      <div className="bg-white/70 rounded-3xl shadow-2xl overflow-hidden perspective-[1000px]">
        {Header}

        <div
          className={`min-h-[100px] flex flex-col justify-center transition-transform duration-700 transform-3d ${
            isFlipped ? "transform-[rotateY(180deg)]" : ""
          }`}
        >
          {isLoading ? <Loader size={"80"} className="my-12" /> : <>{Body}</>}
        </div>
        {Footer}
      </div>
    </div>
  );
};
