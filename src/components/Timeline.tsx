import { useEffect, useRef, type CSSProperties } from "react";
import EditStopForm from "./EditStopForm";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Category, Stop, TripDay } from "../data";

/* Literal class strings so Tailwind's scanner picks them up. */
const catChip: Record<Category, string> = {
  food: "bg-cat-food/12 text-cat-food",
  stay: "bg-cat-stay/12 text-cat-stay",
  sight: "bg-cat-sight/12 text-cat-sight",
  outdoors: "bg-cat-outdoors/12 text-cat-outdoors",
  transit: "bg-cat-transit/12 text-cat-transit",
};

const catIcon: Record<Category, string> = {
  food: "M7 3v8m4-8v8M9 3v18M9 11H5a2 2 0 0 1-2-2V5m14 7c3 0 3-9 0-9v18",
  stay: "M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2m18-2v2M7 10V7h6v3",
  sight: "M12 3 2 12h3v8h6v-5h2v5h6v-8h3L12 3z",
  outdoors: "M12 3 5 13h4l-3 6h12l-3-6h4L12 3zm0 16v2",
  transit: "M3 14l9-2 8-7-2-1-8 6-5-1-1 2 4 2-3 3 2 1 3-3h2l-9 2z",
};

interface StopCardProps {
  stop: Stop;
  number: number;
  selected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

function StopCard({ stop, number, selected, onSelect, onRemove, onEdit }: StopCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: stop.id,
  });
  const cardRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (selected) cardRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selected]);

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <li
      ref={(node) => {
        setNodeRef(node);
        cardRef.current = node;
      }}
      style={style}
      className="relative flex gap-4"
    >
      <div className="flex flex-col items-center">
        <span className="z-10 flex size-7 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-white">
          {number}
        </span>
        <span className="w-px flex-1 bg-line" aria-hidden="true" />
      </div>
      <article
        onClick={() => onSelect(stop.id)}
        className={`group mb-3 flex flex-1 cursor-pointer items-center gap-3 rounded-lg bg-surface p-4 transition-[transform,box-shadow] duration-150 ease-out-soft ${
          isDragging
            ? "scale-[1.02] shadow-modal"
            : selected
              ? "shadow-lift ring-2 ring-accent"
              : "shadow-card hover:-translate-y-0.5 hover:shadow-lift"
        }`}
      >
        <button
          aria-label={`Drag to reorder ${stop.name}`}
          className="cursor-grab touch-none rounded-sm p-1 text-muted opacity-0 transition-opacity duration-150 hover:bg-sunken group-hover:opacity-100 focus-visible:opacity-100 active:cursor-grabbing"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="9" cy="5" r="1.5" />
            <circle cx="15" cy="5" r="1.5" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <circle cx="9" cy="19" r="1.5" />
            <circle cx="15" cy="19" r="1.5" />
          </svg>
        </button>
        <span className={`flex size-12 shrink-0 items-center justify-center rounded-sm ${catChip[stop.category]}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
            <path d={catIcon[stop.category]} />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold leading-tight">{stop.name}</h3>
          <p className="mt-0.5 truncate text-sm text-muted">
            {stop.place} · <span className="font-mono text-xs tabular-nums">{stop.time}</span> · {stop.duration}
          </p>
        </div>
        <button
          aria-label={`Edit ${stop.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(stop.id);
          }}
          className="cursor-pointer rounded-full p-2 text-muted opacity-0 transition-[opacity,color] duration-150 hover:bg-sunken hover:text-ink group-hover:opacity-100 focus-visible:opacity-100"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </button>
        <button
          aria-label={`Remove ${stop.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(stop.id);
          }}
          className="cursor-pointer rounded-full p-2 text-muted opacity-0 transition-[opacity,color] duration-150 hover:bg-sunken hover:text-danger group-hover:opacity-100 focus-visible:opacity-100"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
          </svg>
        </button>
      </article>
    </li>
  );
}

interface TimelineProps {
  days: TripDay[];
  numbers: Map<string, number>;
  selectedId: string | null;
  editingId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onReorder: (dayIndex: number, from: number, to: number) => void;
  onEdit: (id: string | null) => void;
  onSaveEdit: (id: string, patch: Partial<Omit<Stop, "id">>) => void;
}

export default function Timeline({
  days,
  numbers,
  selectedId,
  editingId,
  onSelect,
  onRemove,
  onReorder,
  onEdit,
  onSaveEdit,
}: TimelineProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(dayIndex: number) {
    return ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) return;
      const ids = days[dayIndex].stops.map((s) => s.id);
      onReorder(dayIndex, ids.indexOf(String(active.id)), ids.indexOf(String(over.id)));
    };
  }

  return (
    <div className="mt-6">
      {days.map((day, dayIndex) => (
        <section key={day.label} className="mb-2">
          <div className="mb-3 flex items-baseline gap-2">
            <h2 className="font-display text-xl font-semibold">{day.label}</h2>
            <span className="text-sm text-muted">{day.date}</span>
            <span className="ml-auto text-xs text-muted">
              {day.stops.length} {day.stops.length === 1 ? "stop" : "stops"}
            </span>
          </div>
          {day.stops.length === 0 ? (
            <p className="mb-4 rounded-lg border border-dashed border-line bg-sunken/60 p-4 text-sm text-muted">
              Nothing planned yet — add a stop from the map.
            </p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd(dayIndex)}>
              <SortableContext items={day.stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <ol>
                  {day.stops.map((stop) =>
                    stop.id === editingId ? (
                      <li key={stop.id} className="relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className="z-10 flex size-7 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-white">
                            {numbers.get(stop.id) ?? 0}
                          </span>
                          <span className="w-px flex-1 bg-line" aria-hidden="true" />
                        </div>
                        <EditStopForm
                          stop={stop}
                          onSave={(patch) => onSaveEdit(stop.id, patch)}
                          onCancel={() => onEdit(null)}
                        />
                      </li>
                    ) : (
                      <StopCard
                        key={stop.id}
                        stop={stop}
                        number={numbers.get(stop.id) ?? 0}
                        selected={stop.id === selectedId}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        onEdit={onEdit}
                      />
                    ),
                  )}
                </ol>
              </SortableContext>
            </DndContext>
          )}
        </section>
      ))}
    </div>
  );
}
