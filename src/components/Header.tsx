import { Link } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";

export const Header = () => (
  <div className="w-full relative p-3 mb-4 flex justify-between items-center">
    <Link to="/" className="absolute left-3">
      <HomeIcon className="hover:text-white hover:size-8 transition-all" />
    </Link>
    <div className="w-full flex justify-center">
      <span className="text-white text-2xl font-serif font-thin">
        TontongSpeak®
      </span>
    </div>
  </div>
);
