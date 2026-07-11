import { days } from "../data";

const catFill: Record<string, string> = {
  food: "var(--color-cat-food)",
  stay: "var(--color-cat-stay)",
  sight: "var(--color-cat-sight)",
  outdoors: "var(--color-cat-outdoors)",
  transit: "var(--color-cat-transit)",
};

/* Decorative placeholder map: coastline, cobalt route, numbered stop pins.
   Swap for a real map layer (MapLibre/Leaflet) once tiles are wired up. */
export default function MapPane() {
  const stops = days.flatMap((d) => d.stops);
  const route = stops.map((s, i) => `${i === 0 ? "M" : "L"} ${s.x} ${s.y}`).join(" ");

  return (
    <div className="relative h-full min-h-[480px] overflow-hidden rounded-xl bg-[#eaf3ec] shadow-card">
      <svg viewBox="0 0 400 320" className="size-full" role="img" aria-label="Trip route map with numbered stops">
        {/* ocean */}
        <path d="M0 0 H96 C70 90 108 200 60 320 H0 Z" fill="#cfe3f5" />
        {/* shoreline */}
        <path d="M96 0 C70 90 108 200 60 320" fill="none" stroke="#a9c9e8" strokeWidth="3" />
        {/* park blobs */}
        <ellipse cx="210" cy="230" rx="60" ry="34" fill="#d8ecd8" />
        <ellipse cx="320" cy="150" rx="48" ry="30" fill="#d8ecd8" />
        {/* roads */}
        <path d="M300 0 C280 120 220 200 120 320" fill="none" stroke="#f2e3c4" strokeWidth="5" />
        <path d="M0 140 C120 150 260 120 400 90" fill="none" stroke="#f2e3c4" strokeWidth="5" />
        {/* route */}
        <path d={route} fill="none" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 7" />
        {/* pins */}
        {stops.map((s) => (
          <g key={s.id}>
            <circle cx={s.x} cy={s.y} r="10" fill={catFill[s.category]} stroke="#fff" strokeWidth="2.5" />
            <text
              x={s.x}
              y={s.y + 3.5}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#fff"
              fontFamily="var(--font-mono)"
            >
              {s.id}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <button className="cursor-pointer rounded-md bg-surface px-3 py-2 text-xs font-semibold shadow-card transition-shadow duration-150 hover:shadow-lift">
          Export
        </button>
        <button className="cursor-pointer rounded-md bg-surface px-3 py-2 text-xs font-semibold shadow-card transition-shadow duration-150 hover:shadow-lift">
          Layers
        </button>
      </div>
      <span className="absolute bottom-3 left-4 rounded-full bg-surface/80 px-2.5 py-1 text-xs text-muted backdrop-blur">
        map placeholder
      </span>
    </div>
  );
}
