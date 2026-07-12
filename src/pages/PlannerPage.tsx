import { useCallback, useMemo, useState } from "react";
import TripSummary from "../components/TripSummary";
import Timeline from "../components/Timeline";
import MapView from "../components/MapView";
import AddStopForm from "../components/AddStopForm";
import { navigate } from "../router";
import { stopNumbers, type StoreAction } from "../state";
import type { Category, Stop, Trip } from "../data";

interface Props {
  trip: Trip | undefined;
  dispatch: (action: StoreAction) => void;
}

export default function PlannerPage({ trip, dispatch }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addMode, setAddMode] = useState(false);
  const [pending, setPending] = useState<{ lng: number; lat: number } | null>(null);

  const stops = useMemo(() => trip?.days.flatMap((d) => d.stops) ?? [], [trip]);
  const numbers = useMemo(
    () => (trip ? stopNumbers(trip) : new Map<string, number>()),
    [trip],
  );

  const handleSelect = useCallback((id: string) => setSelectedId(id), []);
  const handlePlacePin = useCallback((lng: number, lat: number) => setPending({ lng, lat }), []);

  if (!trip) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <p className="text-muted">That trip doesn't exist (anymore).</p>
        <a href="#/trips" className="mt-3 inline-block font-semibold text-accent hover:underline">
          Back to your trips
        </a>
      </div>
    );
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[minmax(440px,5fr)_7fr]">
      <div>
        <TripSummary
          trip={trip}
          onRename={(title) => dispatch({ type: "rename-trip", tripId: trip.id, title })}
          onSetDates={(dates) => dispatch({ type: "set-dates", tripId: trip.id, dates })}
          onAddDay={() => dispatch({ type: "add-day", tripId: trip.id })}
          onDelete={() => {
            if (window.confirm(`Delete "${trip.title || "untitled trip"}"? This can't be undone.`)) {
              dispatch({ type: "delete-trip", tripId: trip.id });
              navigate("#/trips");
            }
          }}
        />
        {pending && (
          <AddStopForm
            days={trip.days}
            pending={pending}
            onAdd={(dayIndex: number, name: string, category: Category, time: string) => {
              dispatch({
                type: "add-stop",
                tripId: trip.id,
                dayIndex,
                stop: { name, category, time, lng: pending.lng, lat: pending.lat },
              });
              setPending(null);
              setAddMode(false);
            }}
            onCancel={() => {
              setPending(null);
              setAddMode(false);
            }}
          />
        )}
        <Timeline
          days={trip.days}
          numbers={numbers}
          selectedId={selectedId}
          editingId={editingId}
          onSelect={handleSelect}
          onRemove={(id) => dispatch({ type: "remove-stop", tripId: trip.id, stopId: id })}
          onReorder={(dayIndex, from, to) =>
            dispatch({ type: "reorder-stops", tripId: trip.id, dayIndex, from, to })
          }
          onEdit={setEditingId}
          onSaveEdit={(id, patch: Partial<Omit<Stop, "id">>) => {
            dispatch({ type: "update-stop", tripId: trip.id, stopId: id, patch });
            setEditingId(null);
          }}
        />
        <button
          onClick={() => {
            setAddMode(!addMode);
            setPending(null);
          }}
          className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-150 ease-out-soft hover:-translate-y-0.5 hover:shadow-card ${
            addMode
              ? "bg-ink text-white hover:bg-ink/85"
              : "border border-line bg-surface hover:bg-sunken"
          }`}
        >
          {addMode ? "Cancel — click the map to place a stop" : "+ Add a stop"}
        </button>
      </div>
      <div className="lg:sticky lg:top-[88px] lg:h-[calc(100dvh-112px)]">
        <MapView
          key={trip.id}
          stops={stops}
          numbers={numbers}
          selectedId={selectedId}
          addMode={addMode}
          onSelect={handleSelect}
          onPlacePin={handlePlacePin}
        />
      </div>
    </main>
  );
}
