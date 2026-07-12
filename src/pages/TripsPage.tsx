import type { CSSProperties } from "react";
import type { Trip } from "../data";
import { navigate } from "../router";

const catDot: Record<string, string> = {
  food: "bg-cat-food",
  stay: "bg-cat-stay",
  sight: "bg-cat-sight",
  outdoors: "bg-cat-outdoors",
  transit: "bg-cat-transit",
};

interface Props {
  trips: Trip[];
  onReset: () => void;
}

export default function TripsPage({ trips, onReset }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-4xl font-extrabold tracking-tight">Your trips</h1>
        <button
          onClick={onReset}
          className="cursor-pointer text-xs font-medium text-muted underline-offset-2 transition-colors duration-150 hover:text-danger hover:underline"
        >
          Reset demo data
        </button>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip, i) => {
          const stops = trip.days.flatMap((d) => d.stops);
          return (
            <button
              key={trip.id}
              onClick={() => navigate(`#/trip/${trip.id}`)}
              style={{ "--enter-delay": `${Math.min(i, 5) * 60}ms` } as CSSProperties}
              className="enter-rise cursor-pointer rounded-xl bg-surface p-6 text-left shadow-card transition-[transform,box-shadow] duration-150 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift"
            >
              <h2 className="truncate font-display text-2xl font-bold tracking-tight">
                {trip.title || "untitled trip"}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                {trip.dates && (
                  <span className="rounded-full bg-accent-tint px-2.5 py-0.5 font-mono text-xs text-accent">
                    {trip.dates}
                  </span>
                )}
                {trip.days.length} {trip.days.length === 1 ? "day" : "days"} · {stops.length}{" "}
                {stops.length === 1 ? "stop" : "stops"}
              </p>
              <div className="mt-4 flex items-center gap-1.5">
                {stops.slice(0, 8).map((s) => (
                  <span key={s.id} className={`size-2.5 rounded-full ${catDot[s.category]}`} />
                ))}
                {stops.length > 8 && <span className="text-xs text-muted">+{stops.length - 8}</span>}
                {stops.length === 0 && <span className="text-xs text-muted">no stops yet</span>}
              </div>
            </button>
          );
        })}
        <button
          onClick={() => navigate("#/new")}
          className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-sunken/40 p-6 text-muted transition-colors duration-150 hover:border-primary hover:text-primary"
        >
          <span className="text-2xl leading-none">+</span>
          <span className="text-sm font-semibold">New trip</span>
        </button>
      </div>
    </div>
  );
}
