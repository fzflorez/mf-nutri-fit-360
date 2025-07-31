import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import CalorieTracker from "./components/calorie-tracker";
import { RefreshCcw } from "lucide-react";
import ActivityList from "./components/activity-list";
import Form from "./components/form";

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
      <header className="bg-white shadow-lg p-4 md:px-10 md:py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <h1 className="text-3xl font-extrabold text-gray-800">
              NutriFit <span className="text-green-600">360</span>
            </h1>
          </div>
          <button
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
            className={`bg-red-500 text-white font-bold py-2 px-6 rounded-full shadow-md flex items-center space-x-2 transition duration-300 disabled:opacity-50 ${
              canRestartApp && "cursor-pointer hover:bg-red-600"
            }`}
          >
            <RefreshCcw size={18} />
            <span>Reiniciar App</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto grid grid-cols-1 px-5 my-12 lg:grid-cols-3 gap-8 md:px-10">
        <Form dispatch={dispatch} state={state} />

        <section className="lg:col-span-2 space-y-8">
          <CalorieTracker activities={state.activities} />

          <ActivityList activities={state.activities} dispatch={dispatch} />
        </section>
      </main>
    </>
  );
}

export default App;
