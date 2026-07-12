import type { Trip } from "../data";

interface Props {
  trip: Trip;
  onRename: (title: string) => void;
  onSetDates: (dates: string) => void;
  onAddDay: () => void;
  onDelete: () => void;
}

export default function TripSummary({ trip, onRename, onSetDates, onAddDay, onDelete }: Props) {
  const stopCount = trip.days.reduce((n, d) => n + d.stops.length, 0);

  return (
    <section className="enter-rise rounded-xl bg-surface p-6 shadow-lift">
      <input
        value={trip.title}
        onChange={(e) => onRename(e.target.value)}
        placeholder="name your trip"
        aria-label="Trip name"
        className="w-full bg-transparent font-display text-3xl font-bold tracking-tight text-ink outline-none placeholder:text-muted/50"
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          value={trip.dates}
          onChange={(e) => onSetDates(e.target.value)}
          placeholder="add dates"
          aria-label="Trip dates"
          size={Math.max(trip.dates.length, 9)}
          className="rounded-full bg-accent-tint px-3 py-1 font-mono text-xs text-accent outline-none transition-shadow duration-150 placeholder:text-accent/50 focus:ring-[3px] focus:ring-accent-tint"
        />
        <span className="text-sm text-muted">
          {trip.days.length} {trip.days.length === 1 ? "day" : "days"} · {stopCount}{" "}
          {stopCount === 1 ? "stop" : "stops"}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={onAddDay}
          className="cursor-pointer rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold transition-colors duration-150 hover:bg-sunken"
        >
          + Add a day
        </button>
        <button
          onClick={onDelete}
          className="ml-auto cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium text-muted transition-colors duration-150 hover:bg-sunken hover:text-danger"
        >
          Delete trip
        </button>
      </div>
    </section>
  );
}
