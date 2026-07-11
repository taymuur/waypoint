import Wordmark from "./Wordmark";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-6">
        <Wordmark />
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          <a href="#trips" className="transition-colors duration-150 hover:text-ink">
            Trips
          </a>
          <a href="#explore" className="transition-colors duration-150 hover:text-ink">
            Explore
          </a>
          <a href="#saved" className="transition-colors duration-150 hover:text-ink">
            Saved
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <label className="hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition-colors duration-150 focus-within:border-accent focus-within:ring-[3px] focus-within:ring-accent-tint sm:flex">
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
          <button className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-sunken">
            Log in
          </button>
          <button className="cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-150 ease-out-soft hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-lift active:translate-y-0">
            Start a trip
          </button>
        </div>
      </div>
    </header>
  );
}
