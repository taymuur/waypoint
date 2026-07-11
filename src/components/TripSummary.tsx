import type { CSSProperties } from "react";
import { trip } from "../data";

const avatarColors = ["bg-cat-stay", "bg-cat-transit", "bg-warning"];

export default function TripSummary() {
  return (
    <section className="enter-rise rounded-xl bg-surface p-6 shadow-lift" style={{ "--enter-delay": "0ms" } as CSSProperties}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">{trip.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="whitespace-nowrap rounded-full bg-accent-tint px-3 py-1 font-mono text-xs text-accent">
              {trip.dates}
            </span>
            <span className="text-sm text-muted">6 nights · 2 stops booked</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {trip.travelers.map((t, i) => (
              <span
                key={t}
                className={`flex size-8 items-center justify-center rounded-full border-2 border-surface text-xs font-semibold text-white ${avatarColors[i]}`}
              >
                {t}
              </span>
            ))}
            <span className="flex size-8 items-center justify-center rounded-full border-2 border-surface bg-sunken text-xs font-semibold text-muted">
              +{trip.extraTravelers}
            </span>
          </div>
          <button className="ml-3 cursor-pointer rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold transition-colors duration-150 hover:bg-sunken">
            Invite
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-sm bg-sunken p-4">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Reservations</p>
          <p className="mt-1 text-sm">
            <span className="font-semibold">{trip.reservations.flights}</span> flights ·{" "}
            <span className="font-semibold">{trip.reservations.lodging}</span> lodging ·{" "}
            <span className="font-semibold">{trip.reservations.rentals}</span> rental car
          </p>
        </div>
        <div className="rounded-sm bg-sunken p-4">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Budget</p>
          <p className="mt-1 font-mono text-sm font-semibold tabular-nums">{trip.budget}</p>
        </div>
      </div>
    </section>
  );
}
