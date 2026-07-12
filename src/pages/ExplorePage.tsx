import type { CSSProperties } from "react";
import { ideas, type Idea } from "../data";

interface Props {
  savedIdeas: string[];
  onToggleSave: (ideaId: string) => void;
  onPlan: (idea: Idea) => void;
  /* when set, only these ideas render (used by the Saved page) */
  filterIds?: string[];
  heading?: string;
  subheading?: string;
}

export default function ExplorePage({
  savedIdeas,
  onToggleSave,
  onPlan,
  filterIds,
  heading = "Explore",
  subheading = "Starting points for your next plan — save one, or turn it straight into a trip.",
}: Props) {
  const shown = filterIds ? ideas.filter((i) => filterIds.includes(i.id)) : ideas;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">{heading}</h1>
      <p className="mt-2 max-w-xl text-muted">{subheading}</p>
      {shown.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-line bg-sunken/40 p-10 text-center">
          <p className="text-muted">
            Nothing saved yet — tap the heart on any idea in{" "}
            <a href="#/explore" className="font-semibold text-accent hover:underline">
              Explore
            </a>{" "}
            to keep it here.
          </p>
        </div>
      )}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((idea, i) => {
          const saved = savedIdeas.includes(idea.id);
          return (
            <article
              key={idea.id}
              style={{ "--enter-delay": `${Math.min(i, 5) * 60}ms` } as CSSProperties}
              className="enter-rise group overflow-hidden rounded-xl bg-surface shadow-card transition-[transform,box-shadow] duration-150 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div
                className="relative h-28"
                style={{ background: `linear-gradient(120deg, ${idea.colors[0]}, ${idea.colors[1]})` }}
              >
                <button
                  onClick={() => onToggleSave(idea.id)}
                  aria-label={saved ? `Remove ${idea.title} from saved` : `Save ${idea.title}`}
                  aria-pressed={saved}
                  className="absolute right-3 top-3 cursor-pointer rounded-full bg-surface/90 p-2 shadow-card transition-transform duration-150 ease-out-soft hover:scale-110"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={saved ? "var(--color-primary)" : "none"}
                    stroke={saved ? "var(--color-primary)" : "currentColor"}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    className="text-muted"
                    aria-hidden="true"
                  >
                    <path d="M12 21s-7.5-4.7-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2 4.3-9.5 9-9.5 9z" />
                  </svg>
                </button>
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl font-bold tracking-tight">{idea.title}</h2>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">{idea.region}</p>
                <p className="mt-2 text-sm text-muted">{idea.blurb}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted">{idea.stops.length} seed stops</span>
                  <button
                    onClick={() => onPlan(idea)}
                    className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-primary-strong"
                  >
                    Plan this trip
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
