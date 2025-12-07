import { Link } from "@tanstack/react-router";
import { House, LogOut } from "lucide-react";
import { router } from "../routes";
import { useAppStore } from "../store";

export const Header = () => {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  return (
    <div className="w-full relative p-3 mb-4 flex justify-between items-center">
      <Link to="/" className="absolute left-3">
        <House className="text-white size-7 hover:size-8 transition-all" />
      </Link>
      <div className="w-full flex justify-center">
        <span className="text-white text-2xl font-serif font-thin">
          TontongSpeak®
        </span>
      </div>
      {user && (
        <button
          onClick={() => {
            setUser(null);
            router.navigate({ to: "/" });
          }}
          className="w-40 cursor-pointer flex items-center justify-between"
        >
          <LogOut />
          <span className="font-thin text-md">Se déconnecter</span>
        </button>
      )}
    </div>
  );
};
