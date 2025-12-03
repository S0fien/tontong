import { Link } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";

export const Header = () => (
  <div className="w-full p-3 mb-4 flex justify-between items-center">
    <Link to="/">
      <HomeIcon />
    </Link>
    <h1 className="text-white text-2xl font-serif italic">Tontong & Speak®</h1>
  </div>
);
