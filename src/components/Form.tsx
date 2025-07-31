import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";
import { ChevronDown, PlusCircle } from "lucide-react";

type FormProps = {
  dispatch: React.ActionDispatch<[action: ActivityActions]>;
  state: ActivityState;
};

export default function Form({ dispatch, state }: FormProps) {
  const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: "",
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectActivity);
    }
  }, [state.activeId]);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  }

  function isValidActivity() {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > "";
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity(initialState);
  }

  return (
    <form
      className="lg:col-span-1 bg-white p-6 md:p-8 rounded-xl shadow-xl border border-blue-100 h-fit"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-300 text-center pb-2">
        Registrar Actividad
      </h2>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Categoría:
          </label>
          <div className="relative">
            <select
              id="category"
              value={activity.category}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg outline-none bg-white appearance-none pr-10"
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            {activity.category === 1 ? "Comida" : "Ejercicio"}:
          </label>
          <input
            type="text"
            id="name"
            value={activity.name}
            className="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg"
            placeholder={
              activity.category === 1
                ? "Ej. Manzana, Pollo"
                : "Ej. Correr, Pesas"
            }
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="calories"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Calorías:
          </label>
          <input
            type="number"
            id="calories"
            value={Number(activity.calories) == 0 ? "" : activity.calories}
            placeholder="Ej. 150, 300"
            className="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center space-x-2 transform transition duration-300 disabled:opacity-50 ${
            isValidActivity() && "hover:bg-green-600"
          }`}
          disabled={!isValidActivity()}
        >
          <PlusCircle size={20} />
          <span>
            {state.activeId
              ? "Guardar Cambios"
              : activity.category === 1
              ? "Agregar Comida"
              : "Agregar Ejercicio"}
          </span>
        </button>
      </div>
    </form>
  );
}
