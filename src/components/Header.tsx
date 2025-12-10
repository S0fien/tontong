import { Link } from "@tanstack/react-router";
import { House, LogOut } from "lucide-react";
import { router } from "../routes";
import { useAppStore } from "../store";
import { Button } from "./ui/button";

export const Header = () => {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  return (
    <div className="w-full h-[10vh] p-3 flex justify-between items-center">
      <Link to="/" className={`my-4 ${!user && "hidden"}`}>
        <Button variant={"brutal"} className="p-4 m-4">
          <House className="text-white size-7 " />
        </Button>
      </Link>

      <div className="w-full flex justify-center">
        <span className="text-white text-2xl font-bold">TONTONGSPEAK</span>
      </div>
      {user && (
        <Button
          variant={"brutal"}
          onClick={() => {
            setUser(null);
            router.navigate({ to: "/" });
          }}
          className="cursor-pointer gap-3 flex items-center justify-between"
        >
          <LogOut />
          <span className="font-bold text-md">Se déconnecter</span>
        </Button>
      )}
    </div>
  );
};
