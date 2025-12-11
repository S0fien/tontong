import { redirect, RootRoute, Route, Router } from "@tanstack/react-router";
import App from "./App";
import Grammar from "./pages/Grammar";
import History from "./pages/History";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MonologueDetail from "./pages/MonologueDetail";
import { useAppStore } from "./store";

export const grammarRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/grammar",
  component: Grammar,
});
// Root layout route
export const rootRoute = new RootRoute({
  component: App,

  beforeLoad: async ({ location }) => {
    const user = useAppStore.getState().user;
    if (location.pathname === "/") {
      return;
    }
    if (!user) {
      return redirect({ to: "/" });
    }
  },
});

export const loginRoote = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Login,
  beforeLoad: async () => {
    const user = useAppStore.getState().user;
    if (user) {
      return redirect({ to: "/dashboard" });
    }
  },
});
// Home route
export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Home,
});

// // Monologues list route
// export const monologuesRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "/monologues",
//   component: Monologue,
// });

// Individual monologue detail route
export const monologueDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/monologues",
  component: MonologueDetail,
});

export const historyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: History,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  monologueDetailRoute,
  historyRoute,
  loginRoote,
  grammarRoute,
]);

// Create and export the router
export const router = new Router({ routeTree });

// Register router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
