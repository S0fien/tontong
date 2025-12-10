import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { Header } from "./components/Header";
import { BackgroundGradientAnimation } from "./components/ui/Background";
import "./index.css";

function App() {
  const queryClient = new QueryClient();
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
