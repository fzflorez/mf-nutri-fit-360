import { useMemo } from "react";
import { Activity } from "../types";
import CaloriesDisplay from "./calories-display";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + +activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + +activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesDiference = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );

  return (
    <>
      <h2 className=" text-3xl text-center text-white font-bold md:text-4xl">
        Resumen
      </h2>

      <div className=" flex flex-col gap-5 md:flex-row md:justify-evenly mt-5">
        <CaloriesDisplay calories={caloriesConsumed} text="Consumidas" />

        <CaloriesDisplay calories={caloriesBurned} text="Ejercicio" />

        <CaloriesDisplay calories={caloriesDiference} text="Diferencia" />
      </div>
    </>
  );
}
