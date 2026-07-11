import { useCallback, useEffect, useMemo, useReducer } from "react";
import TopNav from "./components/TopNav";
import TripSummary from "./components/TripSummary";
import Timeline from "./components/Timeline";
import MapView from "./components/MapView";
import AddStopForm from "./components/AddStopForm";
import { initialState, persist, reducer, stopNumbers } from "./state";
import type { Category } from "./data";

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  useEffect(() => {
    persist(state.days);
  }, [state.days]);

  const stops = useMemo(() => state.days.flatMap((d) => d.stops), [state.days]);
  const numbers = useMemo(() => stopNumbers(state.days), [state.days]);

  const handleSelect = useCallback((id: string) => dispatch({ type: "select", id }), []);
  const handlePlacePin = useCallback(
    (lng: number, lat: number) => dispatch({ type: "place-pin", lng, lat }),
    [],
  );

  return (
    <div className="min-h-dvh">
      <TopNav />
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[minmax(440px,5fr)_7fr]">
        <div>
          <TripSummary days={state.days} onReset={() => dispatch({ type: "reset" })} />
          {state.pending && (
            <AddStopForm
              days={state.days}
              pending={state.pending}
              onAdd={(dayIndex: number, name: string, category: Category, time: string) =>
                dispatch({ type: "add", dayIndex, name, category, time })
              }
              onCancel={() => dispatch({ type: "cancel-add" })}
            />
          )}
          <Timeline
            days={state.days}
            numbers={numbers}
            selectedId={state.selectedId}
            onSelect={handleSelect}
            onRemove={(id) => dispatch({ type: "remove", id })}
            onReorder={(dayIndex, from, to) => dispatch({ type: "reorder", dayIndex, from, to })}
          />
          <button
            onClick={() => dispatch({ type: "toggle-add-mode" })}
            className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-150 ease-out-soft hover:-translate-y-0.5 hover:shadow-card ${
              state.addMode
                ? "bg-ink text-white hover:bg-ink/85"
                : "border border-line bg-surface hover:bg-sunken"
            }`}
          >
            {state.addMode ? "Cancel — click the map to place a stop" : "+ Add a stop"}
          </button>
        </div>
        <div className="lg:sticky lg:top-[88px] lg:h-[calc(100dvh-112px)]">
          <MapView
            stops={stops}
            numbers={numbers}
            selectedId={state.selectedId}
            addMode={state.addMode}
            onSelect={handleSelect}
            onPlacePin={handlePlacePin}
          />
        </div>
      </main>
    </div>
  );
}
