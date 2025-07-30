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
    <section className="lg:col-span-2 space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 md:p-8 rounded-2xl shadow-xl text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Resumen Diario</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <CaloriesDisplay calories={caloriesConsumed} text="Consumidas" />

          <CaloriesDisplay calories={caloriesBurned} text="Ejercicio" />

          <CaloriesDisplay calories={caloriesDiference} text="Diferencia" />
        </div>
      </div>
    </section>
  );
}
