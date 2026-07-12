import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import { navigate, type Route } from "../router";

function useDarkMode() {
  const [dark, setDark] = useState(
    () =>
      localStorage.getItem("waypoint-theme") === "dark" ||
      (localStorage.getItem("waypoint-theme") === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("waypoint-theme", dark ? "dark" : "light");
  }, [dark]);
  return [dark, setDark] as const;
}

export default function TopNav({ route }: { route: Route }) {
  const [dark, setDark] = useDarkMode();

  const links = [
    { href: "#/trips", label: "Trips", active: route.page === "trips" || route.page === "planner" || route.page === "new" },
    { href: "#/explore", label: "Explore", active: route.page === "explore" },
    { href: "#/saved", label: "Saved", active: route.page === "saved" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-6">
        <Wordmark />
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              className={`transition-colors duration-150 hover:text-ink ${
                l.active ? "font-semibold text-ink" : "text-muted"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <label className="hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition-colors duration-150 focus-within:border-accent focus-within:ring-[3px] focus-within:ring-accent-tint xl:flex">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="Where to next?"
              className="w-40 bg-transparent text-ink outline-none placeholder:text-muted"
            />
          </label>
          <button
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="cursor-pointer rounded-full p-2 text-muted transition-colors duration-150 hover:bg-sunken hover:text-ink"
          >
            {dark ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <button className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-sunken">
            Log in
          </button>
          <button
            onClick={() => navigate("#/new")}
            className="cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-150 ease-out-soft hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-lift active:translate-y-0"
          >
            Start a trip
          </button>
        </div>
      </div>
    </header>
  );
}
