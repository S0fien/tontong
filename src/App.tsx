import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { BackgroundGradientAnimation } from "./components/ui/Background";
import useOutputIndex from "./hooks/useApp";
import "./index.css";
import { useAppStore } from "./store";

function App() {
  const queryClient = new QueryClient();
  const { indexList, loadingIndex } = useOutputIndex();
  const { setIndex } = useAppStore();
  useEffect(() => {
    if (!loadingIndex && indexList.length > 0) setIndex(indexList);
  }, [indexList, loadingIndex, setIndex]);
  return (
    <QueryClientProvider client={queryClient}>
      <BackgroundGradientAnimation>
        <Header />
        <div className="h-full flex items-center justify-center size-full">
          <Outlet />
        </div>
      </BackgroundGradientAnimation>
      {/* <div className="size-full bg-gradient-to-b from-purple-700 via-purple-600 to-pink-500 flex flex-col items-center">
        <Header />
        <div className="flex size-full mb-12">
          <div className="flex size-full items-center justify-center ">
            <Outlet />
          </div>
        </div>
      </div> */}
    </QueryClientProvider>
  );
}

export default App;
