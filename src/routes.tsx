import { RootRoute, Route, Router } from "@tanstack/react-router";
import App from "./App";
import History from "./features/History";
import Home from "./features/Home";
import Monologues from "./features/Monologues";

// Root layout route
const rootRoute = new RootRoute({
  component: App,
});

// Home route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

// Monologues route
const monologuesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/monologues",
  component: Monologues,
});

const historyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: History,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  monologuesRoute,
  historyRoute,
]);

// Create and export the router
export const router = new Router({ routeTree });

// Register router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
