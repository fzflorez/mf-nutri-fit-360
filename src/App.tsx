import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(
    () => state.activities.length,
    [state.activities]
  );

  return (
    <>
      <header className=" bg-sky-500 px-3 py-5">
        <div className=" flex justify-between items-center max-w-4xl mx-auto">
          <h1 className=" text-3xl text-white font-bold md:text-4xl md:font-black">
            Nutrifit 360
          </h1>
          <button
            className=" text-sm text-black bg-white rounded-lg font-semibold py-1 px-3 transition-all duration-200 ease-in-out disabled:opacity-40 md:text-base"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar
          </button>
        </div>
      </header>

      <main className=" flex flex-col gap-4 py-10 px-3">
        <section className=" flex-1 space-y-8">
          <div className=" max-w-3xl mx-auto">
            <div className=" bg-gray-500 py-5 rounded-xl">
              <Form dispatch={dispatch} state={state} />
            </div>
          </div>

          <div className=" max-w-7xl mx-auto">
            <ActivityList activities={state.activities} dispatch={dispatch} />
          </div>
        </section>

        <section className=" flex-2 static xl:fixed right-0">
          <div className=" max-w-4xl mx-auto pt-5 md:px-0 xl:pt-12 xl:px-16">
            <CalorieTracker activities={state.activities} />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
