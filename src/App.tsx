import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { Header } from "./components/Header";
import "./index.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="size-full bg-gradient-to-b max-h-fit from-purple-700 via-purple-600 to-pink-500 flex flex-col items-center">
        <Header />
        <div className="flex size-full mb-12">
          <div className="flex size-full items-center justify-center max-h-[800px] ">
            <Outlet />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
