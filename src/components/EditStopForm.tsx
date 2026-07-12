import { useState } from "react";
import type { Category, Stop } from "../data";

interface Props {
  stop: Stop;
  onSave: (patch: Partial<Omit<Stop, "id">>) => void;
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

export default function EditStopForm({ stop, onSave, onCancel }: Props) {
  const [name, setName] = useState(stop.name);
  const [place, setPlace] = useState(stop.place);
  const [time, setTime] = useState(stop.time);
  const [duration, setDuration] = useState(stop.duration);
  const [category, setCategory] = useState<Category>(stop.category);

  return (
    <form
      className="enter-rise mb-3 flex-1 rounded-lg border border-accent/40 bg-surface p-4 shadow-lift"
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim()) onSave({ name: name.trim(), place: place.trim(), time: time.trim() || "—", duration: duration.trim(), category });
      }}
    >
      <div className="grid gap-3">
        <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Stop name" aria-label="Stop name" className={fieldClass} />
        <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Place" aria-label="Place" className={fieldClass} />
        <div className="grid grid-cols-3 gap-3">
          <select value={category} onChange={(e) => setCategory(e.target.value as Category)} aria-label="Category" className={fieldClass}>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" aria-label="Time" className={fieldClass} />
          <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration / note" aria-label="Duration" className={fieldClass} />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="submit"
          disabled={!name.trim()}
          className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-sunken"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
