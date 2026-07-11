import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import type { Stop } from "../data";

const catColor: Record<string, string> = {
  food: "var(--color-cat-food)",
  stay: "var(--color-cat-stay)",
  sight: "var(--color-cat-sight)",
  outdoors: "var(--color-cat-outdoors)",
  transit: "var(--color-cat-transit)",
};

const osmStyle: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

function createMap(container: HTMLElement): maplibregl.Map {
  const map = new maplibregl.Map({
    container,
    style: osmStyle,
    center: [-123.2, 45.7],
    zoom: 8,
    attributionControl: { compact: true },
  });
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
  return map;
}

interface Props {
  stops: Stop[];
  numbers: Map<string, number>;
  selectedId: string | null;
  addMode: boolean;
  onSelect: (id: string) => void;
  onPlacePin: (lng: number, lat: number) => void;
}

export default function MapView({ stops, numbers, selectedId, addMode, onSelect, onPlacePin }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const [loaded, setLoaded] = useState(false);
  const [unsupported, setUnsupported] = useState(false);

  /* create the map once */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let map: maplibregl.Map;
    try {
      map = createMap(containerRef.current);
    } catch {
      setUnsupported(true);
      return;
    }
    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#2456e6",
          "line-width": 3,
          "line-dasharray": [0.1, 2],
        },
      });
      setLoaded(true);
    });
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  /* fit the whole trip once on first load */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded || stops.length === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    for (const s of stops) bounds.extend([s.lng, s.lat]);
    map.fitBounds(bounds, { padding: 70, maxZoom: 10, animate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  /* sync markers + route with the stop list */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded) return;

    const route = map.getSource("route") as maplibregl.GeoJSONSource | undefined;
    route?.setData({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: stops.map((s) => [s.lng, s.lat]) },
    });

    for (const marker of markersRef.current.values()) marker.remove();
    markersRef.current.clear();

    for (const s of stops) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "stop-pin";
      el.style.setProperty("--pin-color", catColor[s.category]);
      el.textContent = String(numbers.get(s.id) ?? "•");
      el.setAttribute("aria-label", `${s.name} — stop ${numbers.get(s.id)}`);
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect(s.id);
      });
      const marker = new maplibregl.Marker({ element: el }).setLngLat([s.lng, s.lat]).addTo(map);
      markersRef.current.set(s.id, marker);
    }
  }, [stops, numbers, loaded, onSelect]);

  /* highlight + fly to the selected stop */
  useEffect(() => {
    for (const [id, marker] of markersRef.current) {
      marker.getElement().classList.toggle("selected", id === selectedId);
    }
    const map = mapRef.current;
    const stop = stops.find((s) => s.id === selectedId);
    if (map && stop) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      map.flyTo({
        center: [stop.lng, stop.lat],
        zoom: Math.max(map.getZoom(), 10.5),
        duration: reduceMotion ? 0 : 1200,
      });
    }
  }, [selectedId, stops]);

  /* add mode: crosshair cursor, next map click places the pin */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.getCanvas().style.cursor = addMode ? "crosshair" : "";
    if (!addMode) return;
    const handler = (e: maplibregl.MapMouseEvent) => onPlacePin(e.lngLat.lng, e.lngLat.lat);
    map.on("click", handler);
    return () => {
      map.off("click", handler);
    };
  }, [addMode, onPlacePin]);

  if (unsupported) {
    return (
      <div className="flex h-full min-h-[480px] items-center justify-center rounded-xl bg-sunken shadow-card">
        <p className="max-w-xs text-center text-sm text-muted">
          The map needs WebGL, which this browser doesn't support. The itinerary still
          works — try a current version of Chrome, Firefox, or Safari to see the map.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[480px] overflow-hidden rounded-xl shadow-card">
      <div ref={containerRef} className="size-full" />
      {addMode && (
        <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center">
          <span className="enter-rise rounded-full bg-ink px-4 py-2 text-sm font-medium text-white shadow-lift">
            Click anywhere on the map to place your stop
          </span>
        </div>
      )}
    </div>
  );
}
