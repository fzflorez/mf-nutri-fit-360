import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/activity-list";
import CalorieTracker from "./components/calorie-tracker";
import Form from "./components/Form";

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
            className=" text-base text-black bg-white rounded-lg font-semibold py-1 px-3 transition-all duration-200 ease-in-out disabled:opacity-40 md:text-lg"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <main className=" relative space-y-8 py-10 px-5 md:px-0">
        <section className=" max-w-3xl mx-auto bg-gray-500 py-5 rounded-xl">
          <Form dispatch={dispatch} state={state} />
        </section>

        <section className=" w-full bg-gray-800 py-6">
          <CalorieTracker activities={state.activities} />
        </section>

        <section className=" max-w-7xl mx-auto">
          <ActivityList activities={state.activities} dispatch={dispatch} />
        </section>
      </main>
    </>
  );
}

export default App;
