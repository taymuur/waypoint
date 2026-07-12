import { useEffect, useState } from "react";

/* Hash-based routing: works on GitHub Pages with no server rewrites. */
export type Route =
  | { page: "trips" }
  | { page: "new" }
  | { page: "planner"; tripId: string }
  | { page: "explore" }
  | { page: "saved" };

export function parseRoute(hash: string): Route {
  const h = hash.replace(/^#\/?/, "");
  if (h.startsWith("trip/")) return { page: "planner", tripId: h.slice(5) };
  if (h === "new") return { page: "new" };
  if (h === "explore") return { page: "explore" };
  if (h === "saved") return { page: "saved" };
  return { page: "trips" };
}

export function navigate(to: string) {
  location.hash = to;
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseRoute(location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
