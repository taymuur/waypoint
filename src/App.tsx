import TopNav from "./components/TopNav";
import TripSummary from "./components/TripSummary";
import Timeline from "./components/Timeline";
import MapPane from "./components/MapPane";

export default function App() {
  return (
    <div className="min-h-dvh">
      <TopNav />
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[minmax(440px,5fr)_7fr]">
        <div>
          <TripSummary />
          <Timeline />
        </div>
        <div className="lg:sticky lg:top-[88px] lg:h-[calc(100dvh-112px)]">
          <MapPane />
        </div>
      </main>
    </div>
  );
}
