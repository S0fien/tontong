import { Outlet } from "@tanstack/react-router";
import { Header } from "./components/header";
import "./index.css";

function App() {
  return (
    <div className="size-full bg-gradient-to-b from-purple-700 via-purple-600 to-pink-500 flex flex-col items-center">
      <Header />
      <div className="flex size-full items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
