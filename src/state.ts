import { arrayMove } from "@dnd-kit/sortable";
import { initialDays, type Category, type Stop, type TripDay } from "./data";

const STORAGE_KEY = "waypoint-trip-v1";

export interface TripState {
  days: TripDay[];
  selectedId: string | null;
  addMode: boolean;
  /* where the user clicked the map while in add mode; opens the add-stop form */
  pending: { lng: number; lat: number } | null;
}

export type Action =
  | { type: "select"; id: string | null }
  | { type: "remove"; id: string }
  | { type: "reorder"; dayIndex: number; from: number; to: number }
  | { type: "toggle-add-mode" }
  | { type: "place-pin"; lng: number; lat: number }
  | { type: "cancel-add" }
  | {
      type: "add";
      dayIndex: number;
      name: string;
      category: Category;
      time: string;
    }
  | { type: "reset" };

export function reducer(state: TripState, action: Action): TripState {
  switch (action.type) {
    case "select":
      return { ...state, selectedId: action.id };
    case "remove": {
      const days = state.days.map((d) => ({
        ...d,
        stops: d.stops.filter((s) => s.id !== action.id),
      }));
      return {
        ...state,
        days,
        selectedId: state.selectedId === action.id ? null : state.selectedId,
      };
    }
    case "reorder": {
      const days = state.days.map((d, i) =>
        i === action.dayIndex
          ? { ...d, stops: arrayMove(d.stops, action.from, action.to) }
          : d,
      );
      return { ...state, days };
    }
    case "toggle-add-mode":
      return { ...state, addMode: !state.addMode, pending: null };
    case "place-pin":
      return { ...state, pending: { lng: action.lng, lat: action.lat } };
    case "cancel-add":
      return { ...state, addMode: false, pending: null };
    case "add": {
      if (!state.pending) return state;
      const stop: Stop = {
        id: `s${Date.now()}`,
        name: action.name,
        place: `${state.pending.lat.toFixed(4)}, ${state.pending.lng.toFixed(4)}`,
        time: action.time || "—",
        duration: "new stop",
        category: action.category,
        lng: state.pending.lng,
        lat: state.pending.lat,
      };
      const days = state.days.map((d, i) =>
        i === action.dayIndex ? { ...d, stops: [...d.stops, stop] } : d,
      );
      return { ...state, days, addMode: false, pending: null, selectedId: stop.id };
    }
    case "reset":
      localStorage.removeItem(STORAGE_KEY);
      return { ...initialState(), days: initialDays };
  }
}

export function initialState(): TripState {
  let days = initialDays;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) days = JSON.parse(raw) as TripDay[];
  } catch {
    /* corrupted or unavailable storage — fall back to the sample trip */
  }
  return { days, selectedId: null, addMode: false, pending: null };
}

export function persist(days: TripDay[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
  } catch {
    /* storage full or blocked — the app still works, just without persistence */
  }
}

/* Global stop numbering: 1..n across all days, shared by timeline and map. */
export function stopNumbers(days: TripDay[]): Map<string, number> {
  const numbers = new Map<string, number>();
  let n = 1;
  for (const day of days) for (const stop of day.stops) numbers.set(stop.id, n++);
  return numbers;
}
