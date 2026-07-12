import { arrayMove } from "@dnd-kit/sortable";
import { sampleTrip, type Category, type Stop, type Trip } from "./data";

const STORAGE_KEY = "waypoint-store-v2";

export interface Store {
  trips: Trip[];
  savedIdeas: string[];
}

export interface NewStopInput {
  name: string;
  category: Category;
  time: string;
  lng: number;
  lat: number;
  place?: string;
  duration?: string;
}

export type StoreAction =
  | { type: "create-trip"; id: string; title: string; dates: string; dayCount: number; seedStops?: Omit<Stop, "id">[] }
  | { type: "delete-trip"; tripId: string }
  | { type: "rename-trip"; tripId: string; title: string }
  | { type: "set-dates"; tripId: string; dates: string }
  | { type: "add-day"; tripId: string }
  | { type: "add-stop"; tripId: string; dayIndex: number; stop: NewStopInput }
  | { type: "update-stop"; tripId: string; stopId: string; patch: Partial<Omit<Stop, "id">> }
  | { type: "remove-stop"; tripId: string; stopId: string }
  | { type: "reorder-stops"; tripId: string; dayIndex: number; from: number; to: number }
  | { type: "toggle-saved"; ideaId: string }
  | { type: "reset" };

function withTrip(store: Store, tripId: string, fn: (trip: Trip) => Trip): Store {
  return { ...store, trips: store.trips.map((t) => (t.id === tripId ? fn(t) : t)) };
}

let uid = 0;
export function freshId(prefix: string): string {
  return `${prefix}${Date.now().toString(36)}${(uid++).toString(36)}`;
}

export function storeReducer(store: Store, action: StoreAction): Store {
  switch (action.type) {
    case "create-trip": {
      const days = Array.from({ length: Math.max(1, action.dayCount) }, (_, i) => ({
        label: `Day ${i + 1}`,
        date: "",
        stops: [] as Stop[],
      }));
      for (const seed of action.seedStops ?? []) {
        days[0].stops.push({ ...seed, id: freshId("s") });
      }
      const trip: Trip = { id: action.id, title: action.title, dates: action.dates, days };
      return { ...store, trips: [trip, ...store.trips] };
    }
    case "delete-trip":
      return { ...store, trips: store.trips.filter((t) => t.id !== action.tripId) };
    case "rename-trip":
      return withTrip(store, action.tripId, (t) => ({ ...t, title: action.title }));
    case "set-dates":
      return withTrip(store, action.tripId, (t) => ({ ...t, dates: action.dates }));
    case "add-day":
      return withTrip(store, action.tripId, (t) => ({
        ...t,
        days: [...t.days, { label: `Day ${t.days.length + 1}`, date: "", stops: [] }],
      }));
    case "add-stop":
      return withTrip(store, action.tripId, (t) => ({
        ...t,
        days: t.days.map((d, i) =>
          i === action.dayIndex
            ? {
                ...d,
                stops: [
                  ...d.stops,
                  {
                    id: freshId("s"),
                    name: action.stop.name,
                    place: action.stop.place ?? `${action.stop.lat.toFixed(4)}, ${action.stop.lng.toFixed(4)}`,
                    time: action.stop.time || "—",
                    duration: action.stop.duration ?? "new stop",
                    category: action.stop.category,
                    lng: action.stop.lng,
                    lat: action.stop.lat,
                  },
                ],
              }
            : d,
        ),
      }));
    case "update-stop":
      return withTrip(store, action.tripId, (t) => ({
        ...t,
        days: t.days.map((d) => ({
          ...d,
          stops: d.stops.map((s) => (s.id === action.stopId ? { ...s, ...action.patch } : s)),
        })),
      }));
    case "remove-stop":
      return withTrip(store, action.tripId, (t) => ({
        ...t,
        days: t.days.map((d) => ({ ...d, stops: d.stops.filter((s) => s.id !== action.stopId) })),
      }));
    case "reorder-stops":
      return withTrip(store, action.tripId, (t) => ({
        ...t,
        days: t.days.map((d, i) =>
          i === action.dayIndex ? { ...d, stops: arrayMove(d.stops, action.from, action.to) } : d,
        ),
      }));
    case "toggle-saved":
      return {
        ...store,
        savedIdeas: store.savedIdeas.includes(action.ideaId)
          ? store.savedIdeas.filter((i) => i !== action.ideaId)
          : [...store.savedIdeas, action.ideaId],
      };
    case "reset":
      localStorage.removeItem(STORAGE_KEY);
      return initialStore(true);
  }
}

export function initialStore(fresh = false): Store {
  if (!fresh) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Store;
    } catch {
      /* corrupted or unavailable storage — fall back to the sample trip */
    }
  }
  return { trips: [sampleTrip], savedIdeas: [] };
}

export function persist(store: Store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* storage full or blocked — the app still works, just without persistence */
  }
}

/* Global stop numbering: 1..n across all days, shared by timeline and map. */
export function stopNumbers(trip: Trip): Map<string, number> {
  const numbers = new Map<string, number>();
  let n = 1;
  for (const day of trip.days) for (const stop of day.stops) numbers.set(stop.id, n++);
  return numbers;
}
