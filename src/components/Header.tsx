import { Link } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";

export const Header = () => (
  <div className="w-full p-3 mb-4 flex justify-between items-center">
    <Link to="/">
      <HomeIcon />
    </Link>
    <nav className="w-1/3 flex justify-around items-center">
      <Link to="/monologues">Monologues</Link>
      <Link to="/">History</Link>
      <Link to="/">Account</Link>
    </nav>
    <h1 className="text-white text-2xl font-serif italic">Tontong & Speak®</h1>
  </div>
);
