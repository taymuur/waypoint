import type { CSSProperties } from "react";
import { days, type Category, type Stop } from "../data";

/* Literal class strings so Tailwind's scanner picks them up. */
const catChip: Record<Category, string> = {
  food: "bg-cat-food/12 text-cat-food",
  stay: "bg-cat-stay/12 text-cat-stay",
  sight: "bg-cat-sight/12 text-cat-sight",
  outdoors: "bg-cat-outdoors/12 text-cat-outdoors",
  transit: "bg-cat-transit/12 text-cat-transit",
};

const catIcon: Record<Category, string> = {
  food: "M7 3v8m4-8v8M9 3v18M9 11H5a2 2 0 0 1-2-2V5m14 7c3 0 3-9 0-9v18",
  stay: "M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2m18-2v2M7 10V7h6v3",
  sight: "M12 3 2 12h3v8h6v-5h2v5h6v-8h3L12 3z",
  outdoors: "M12 3 5 13h4l-3 6h12l-3-6h4L12 3zm0 16v2",
  transit: "M3 14l9-2 8-7-2-1-8 6-5-1-1 2 4 2-3 3 2 1 3-3h2l-9 2z",
};

function StopCard({ stop, index }: { stop: Stop; index: number }) {
  return (
    <li
      className="enter-rise relative flex gap-4"
      style={{ "--enter-delay": `${Math.min(index, 5) * 60}ms` } as CSSProperties}
    >
      <div className="flex flex-col items-center">
        <span className="z-10 flex size-7 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-white">
          {stop.id}
        </span>
        <span className="w-px flex-1 bg-line" aria-hidden="true" />
      </div>
      <article className="group mb-3 flex flex-1 cursor-pointer items-center gap-4 rounded-lg bg-surface p-4 shadow-card transition-[transform,box-shadow] duration-150 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift">
        <span className={`flex size-12 shrink-0 items-center justify-center rounded-sm ${catChip[stop.category]}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
            <path d={catIcon[stop.category]} />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold leading-tight">{stop.name}</h3>
          <p className="mt-0.5 truncate text-sm text-muted">
            {stop.place} · <span className="font-mono text-xs tabular-nums">{stop.time}</span> · {stop.duration}
          </p>
        </div>
        <button
          aria-label={`More options for ${stop.name}`}
          className="cursor-pointer rounded-full p-2 text-muted opacity-0 transition-opacity duration-150 hover:bg-sunken group-hover:opacity-100 focus-visible:opacity-100"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="5" cy="12" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="19" cy="12" r="1.6" />
          </svg>
        </button>
      </article>
    </li>
  );
}

export default function Timeline() {
  let i = 0;
  return (
    <div className="mt-6">
      {days.map((day) => (
        <section key={day.label} className="mb-2">
          <div className="mb-3 flex items-baseline gap-2">
            <h2 className="font-display text-xl font-semibold">{day.label}</h2>
            <span className="text-sm text-muted">{day.date}</span>
          </div>
          <ol>
            {day.stops.map((stop) => (
              <StopCard key={stop.id} stop={stop} index={i++} />
            ))}
          </ol>
        </section>
      ))}
      <button className="cursor-pointer rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-150 ease-out-soft hover:-translate-y-0.5 hover:bg-sunken hover:shadow-card">
        + Add a stop
      </button>
    </div>
  );
}
