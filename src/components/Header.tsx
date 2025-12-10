import { Link } from "@tanstack/react-router";
import { House, LogOut } from "lucide-react";
import { router } from "../routes";
import { useAppStore } from "../store";
import { Button } from "./ui/button";

export const Header = () => {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  return (
    <div className="w-full h-[10vh]  p-3 flex justify-between items-center">
      <Link to="/" className={`pl-3 ${!user && "hidden"}`}>
        <House className="text-white size-7 hover:size-8 transition-all" />
      </Link>
      <div className="w-full flex justify-center">
        <span className="text-white text-2xl font-serif font-thin">
          TontongSpeak®
        </span>
      </div>
      {user && (
        <Button
          variant={"brutal"}
          onClick={() => {
            setUser(null);
            router.navigate({ to: "/" });
          }}
          className="w-40 cursor-pointer flex items-center justify-between"
        >
          <LogOut />
          <span className="font-thin text-md">Se déconnecter</span>
        </Button>
      )}
    </div>
  );
};
