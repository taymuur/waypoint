import { useEffect, useReducer } from "react";
import TopNav from "./components/TopNav";
import PlannerPage from "./pages/PlannerPage";
import TripsPage from "./pages/TripsPage";
import NewTripPage from "./pages/NewTripPage";
import ExplorePage from "./pages/ExplorePage";
import { navigate, useRoute } from "./router";
import { freshId, initialStore, persist, storeReducer } from "./state";
import type { Idea } from "./data";

export default function App() {
  const route = useRoute();
  const [store, dispatch] = useReducer(storeReducer, undefined, () => initialStore());

  useEffect(() => {
    persist(store);
  }, [store]);

  function createTrip(title: string, dates: string, dayCount: number): string {
    const id = freshId("t");
    dispatch({ type: "create-trip", id, title, dates, dayCount });
    return id;
  }

  function planIdea(idea: Idea) {
    const id = freshId("t");
    dispatch({
      type: "create-trip",
      id,
      title: idea.title,
      dates: "",
      dayCount: 3,
      seedStops: idea.stops,
    });
    navigate(`#/trip/${id}`);
  }

  return (
    <div className="min-h-dvh">
      <TopNav route={route} />
      {route.page === "trips" && (
        <TripsPage trips={store.trips} onReset={() => dispatch({ type: "reset" })} />
      )}
      {route.page === "new" && <NewTripPage onCreate={createTrip} />}
      {route.page === "planner" && (
        <PlannerPage trip={store.trips.find((t) => t.id === route.tripId)} dispatch={dispatch} />
      )}
      {route.page === "explore" && (
        <ExplorePage
          savedIdeas={store.savedIdeas}
          onToggleSave={(ideaId) => dispatch({ type: "toggle-saved", ideaId })}
          onPlan={planIdea}
        />
      )}
      {route.page === "saved" && (
        <ExplorePage
          savedIdeas={store.savedIdeas}
          onToggleSave={(ideaId) => dispatch({ type: "toggle-saved", ideaId })}
          onPlan={planIdea}
          filterIds={store.savedIdeas}
          heading="Saved"
          subheading="Ideas you've hearted. Turn any of them into a trip when you're ready."
        />
      )}
    </div>
  );
}
