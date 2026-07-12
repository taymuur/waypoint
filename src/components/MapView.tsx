import { useCallback, useEffect, useRef, useState } from "react";
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

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  /* generation counter: bumping it cancels any in-flight route animation */
  const genRef = useRef(0);
  const autoPlayedRef = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [unsupported, setUnsupported] = useState(false);

  const setLine = useCallback((coords: [number, number][]) => {
    const source = mapRef.current?.getSource("route") as maplibregl.GeoJSONSource | undefined;
    source?.setData({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: coords },
    });
  }, []);

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
      genRef.current++;
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

  const playRoute = useCallback(async () => {
    const map = mapRef.current;
    if (!map || stops.length === 0) return;
    const gen = ++genRef.current;
    const pts = stops.map((s) => [s.lng, s.lat] as [number, number]);

    if (reducedMotion() || pts.length < 2) {
      setLine(pts);
      return;
    }

    setPlaying(true);
    for (const marker of markersRef.current.values()) {
      marker.getElement().querySelector(".stop-pin")?.classList.add("hidden-pin");
    }
    setLine([]);

    const reveal = (i: number) => {
      const pin = markersRef.current.get(stops[i].id)?.getElement().querySelector(".stop-pin");
      if (!pin) return;
      pin.classList.remove("hidden-pin");
      pin.classList.add("pop");
      window.setTimeout(() => pin.classList.remove("pop"), 450);
    };

    reveal(0);
    const drawn: [number, number][] = [pts[0]];
    for (let k = 1; k < pts.length; k++) {
      const [a, b] = [pts[k - 1], pts[k]];
      await new Promise<void>((resolve) => {
        const t0 = performance.now();
        const frame = (t: number) => {
          if (gen !== genRef.current) return resolve();
          const p = Math.min(1, (t - t0) / 600);
          const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
          setLine([...drawn, [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e]]);
          if (p < 1) requestAnimationFrame(frame);
          else resolve();
        };
        requestAnimationFrame(frame);
      });
      if (gen !== genRef.current) break;
      drawn.push(b);
      reveal(k);
    }

    if (gen === genRef.current) {
      setLine(pts);
      for (const marker of markersRef.current.values()) {
        marker.getElement().querySelector(".stop-pin")?.classList.remove("hidden-pin");
      }
    }
    setPlaying(false);
  }, [stops, setLine]);

  /* sync markers + route with the stop list */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded) return;
    genRef.current++; // cancel any running animation before rebuilding
    setPlaying(false);
    setLine(stops.map((s) => [s.lng, s.lat]));

    for (const marker of markersRef.current.values()) marker.remove();
    markersRef.current.clear();

    for (const s of stops) {
      /* outer div is positioned by MapLibre; inner button carries visuals so
         CSS transforms/animations don't fight the marker's own transform */
      const wrapper = document.createElement("div");
      const pin = document.createElement("button");
      pin.type = "button";
      pin.className = "stop-pin";
      pin.style.setProperty("--pin-color", catColor[s.category]);
      pin.textContent = String(numbers.get(s.id) ?? "•");
      pin.setAttribute("aria-label", `${s.name} — stop ${numbers.get(s.id)}`);
      pin.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect(s.id);
      });
      wrapper.appendChild(pin);
      const marker = new maplibregl.Marker({ element: wrapper }).setLngLat([s.lng, s.lat]).addTo(map);
      markersRef.current.set(s.id, marker);
    }

    /* auto-play the route reveal the first time a trip renders */
    if (!autoPlayedRef.current && stops.length > 1) {
      autoPlayedRef.current = true;
      window.setTimeout(() => void playRoute(), 500);
    }
  }, [stops, numbers, loaded, onSelect, setLine, playRoute]);

  /* highlight + fly to the selected stop */
  useEffect(() => {
    for (const [id, marker] of markersRef.current) {
      marker
        .getElement()
        .querySelector(".stop-pin")
        ?.classList.toggle("selected", id === selectedId);
    }
    const map = mapRef.current;
    const stop = stops.find((s) => s.id === selectedId);
    if (map && stop) {
      map.flyTo({
        center: [stop.lng, stop.lat],
        zoom: Math.max(map.getZoom(), 10.5),
        duration: reducedMotion() ? 0 : 1200,
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
      {stops.length > 1 && (
        <button
          onClick={() => void playRoute()}
          disabled={playing}
          className="absolute left-4 top-4 flex cursor-pointer items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-card transition-[box-shadow,transform] duration-150 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-default disabled:opacity-60"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15l13-7.5-13-7.5z" />
          </svg>
          {playing ? "Playing…" : "Play route"}
        </button>
      )}
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
