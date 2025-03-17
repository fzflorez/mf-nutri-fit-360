import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: React.ActionDispatch<[action: ActivityActions]>;
  state: ActivityState;
};

export default function Form({ dispatch, state }: FormProps) {
  const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
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
    return name.trim() !== "" && calories > 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity(initialState);
  }

  return (
    <form className=" space-y-5 p-4 md:p-10" onSubmit={handleSubmit}>
      <div className=" grid grid-cols-1 gap-2">
        <label
          htmlFor="category"
          className=" text-base font-bold md:text-lg text-white"
        >
          Categoría:
        </label>
        <select
          id="category"
          value={activity.category}
          className=" border border-gray-300 py-1 px-2 rounded-lg w-full bg-white md:p-2"
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className=" grid grid-cols-1 gap-2">
        <label
          htmlFor="name"
          className=" text-base font-bold md:text-lg text-white"
        >
          {activity.category === 1 ? "Comida" : "Ejercicio"}:
        </label>
        <input
          type="text"
          id="name"
          value={activity.name}
          className=" border border-gray-300 py-1 px-2 rounded-lg md:p-2"
          placeholder="Ej. Comida, Ejercicio"
          onChange={handleChange}
        />
      </div>

      <div className=" grid grid-cols-1 gap-2">
        <label
          htmlFor="calories"
          className=" text-base font-bold md:text-lg text-white"
        >
          Calorias:
        </label>
        <input
          type="number"
          id="calories"
          value={activity.calories}
          className=" border border-gray-300 py-1 px-2 rounded-lg md:p-2"
          placeholder="Ej. 300, 500"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className=" bg-sky-500 text-white font-bold w-full py-1 rounded-sm cursor-pointer disabled:opacity-60 md:p-2"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
