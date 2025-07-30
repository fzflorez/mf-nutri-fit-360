import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/activity-list";
import CalorieTracker from "./components/calorie-tracker";
import Form from "./components/Form";
import { RefreshCcw } from "lucide-react";

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
      <header className="bg-white shadow-lg p-4 md:p-6 mb-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-white font-bold text-xl shadow-md">
              NF
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">NutriFit <span className="text-green-600">360</span></h1>
          </div>
          <button
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
            className={`bg-red-500 text-white font-bold py-2 px-6 rounded-full shadow-md flex items-center space-x-2 transition duration-300 disabled:opacity-50 ${canRestartApp && 'cursor-pointer hover:bg-red-600'}`}
          >
            <RefreshCcw size={18} />
            <span>Reiniciar App</span>
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
