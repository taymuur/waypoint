import { useState } from "react";
import { navigate } from "../router";

const fieldClass =
  "w-full rounded-sm border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-accent focus:ring-[3px] focus:ring-accent-tint";

interface Props {
  onCreate: (title: string, dates: string, dayCount: number) => string;
}

export default function NewTripPage({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [dates, setDates] = useState("");
  const [dayCount, setDayCount] = useState(3);

  return (
    <div className="mx-auto max-w-md px-6 py-14">
      <h1 className="enter-rise font-display text-4xl font-extrabold tracking-tight">
        Where to next?
      </h1>
      <form
        className="enter-rise mt-8 rounded-xl bg-surface p-6 shadow-lift"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          const id = onCreate(title.trim(), dates.trim(), dayCount);
          navigate(`#/trip/${id}`);
        }}
      >
        <label className="block text-xs font-medium uppercase tracking-[0.08em] text-muted">
          Trip name
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. tuscany slow week"
            className={`mt-1.5 ${fieldClass}`}
          />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <label className="block text-xs font-medium uppercase tracking-[0.08em] text-muted">
            Dates
            <input
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="Sep 4 – 10"
              className={`mt-1.5 ${fieldClass}`}
            />
          </label>
          <label className="block text-xs font-medium uppercase tracking-[0.08em] text-muted">
            Days
            <input
              type="number"
              min={1}
              max={30}
              value={dayCount}
              onChange={(e) => setDayCount(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
              className={`mt-1.5 ${fieldClass}`}
            />
          </label>
        </div>
        <div className="mt-6 flex gap-2">
          <button
            type="submit"
            disabled={!title.trim()}
            className="cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-150 ease-out-soft hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create trip
          </button>
          <button
            type="button"
            onClick={() => navigate("#/trips")}
            className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-sunken"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
