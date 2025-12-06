import { redirect, RootRoute, Route, Router } from "@tanstack/react-router";
import App from "./App";
import History from "./pages/History";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Monologues from "./pages/Monologues";
import { useAppStore } from "./store";

// Root layout route
export const rootRoute = new RootRoute({
  component: App,
  beforeLoad: async ({ location, matches }) => {
    const user = useAppStore.getState().user;
    console.log("Current user in route guard:", location, loginRoote, matches);
    if (location.pathname === "/") {
      return;
    }
    if (!user) {
      console.log("No user found, redirecting to /login");
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
    console.log("Current user in login route guard:", user);
    if (user) {
      console.log("User found, redirecting to /dashboard");
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

// Monologues list route
export const monologuesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/monologues",
  component: Monologues,
});

// Individual monologue detail route
export const monologueDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/monologues/$id",
  component: Monologues,
});

export const historyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: History,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  monologuesRoute,
  monologueDetailRoute,
  historyRoute,
  loginRoote,
]);

// Create and export the router
export const router = new Router({ routeTree });

// Register router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
