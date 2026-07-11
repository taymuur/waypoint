import { useState } from "react";
import type { Category, TripDay } from "../data";

interface Props {
  days: TripDay[];
  pending: { lng: number; lat: number };
  onAdd: (dayIndex: number, name: string, category: Category, time: string) => void;
  onCancel: () => void;
}

const categories: { value: Category; label: string }[] = [
  { value: "sight", label: "Sight" },
  { value: "food", label: "Food & drink" },
  { value: "outdoors", label: "Outdoors" },
  { value: "stay", label: "Lodging" },
  { value: "transit", label: "Transit" },
];

const fieldClass =
  "w-full rounded-sm border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors duration-150 placeholder:text-muted focus:border-accent focus:ring-[3px] focus:ring-accent-tint";

export default function AddStopForm({ days, pending, onAdd, onCancel }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("sight");
  const [dayIndex, setDayIndex] = useState(0);
  const [time, setTime] = useState("");

  return (
    <form
      className="enter-rise mt-4 rounded-lg border border-accent/40 bg-surface p-4 shadow-lift"
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim()) onAdd(dayIndex, name.trim(), category, time.trim());
      }}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-lg font-semibold">New stop</h3>
        <span className="font-mono text-xs text-muted tabular-nums">
          {pending.lat.toFixed(4)}, {pending.lng.toFixed(4)}
        </span>
      </div>
      <div className="mt-3 grid gap-3">
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name this stop"
          aria-label="Stop name"
          className={fieldClass}
        />
        <div className="grid grid-cols-3 gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            aria-label="Category"
            className={fieldClass}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={dayIndex}
            onChange={(e) => setDayIndex(Number(e.target.value))}
            aria-label="Day"
            className={fieldClass}
          >
            {days.map((d, i) => (
              <option key={d.label} value={i}>
                {d.label}
              </option>
            ))}
          </select>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Time"
            aria-label="Time"
            className={fieldClass}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={!name.trim()}
          className="cursor-pointer rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out-soft hover:-translate-y-0.5 hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add stop
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-sunken"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
