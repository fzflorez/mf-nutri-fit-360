import { useMemo } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: React.ActionDispatch<[action: ActivityActions]>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  return (
    <>
      <h2 className=" text-3xl text-gray-700 font-bold text-center mb-5 md:text-4xl">
        Comida y Actividades
      </h2>

      {activities.length === 0 ? (
        <p className=" text-gray-500 text-center my-5">
          Aún no hay activiades...
        </p>
      ) : (
        <div className=" grid grid-cols-1 gap-5 max-w-4xl mx-auto md:grid-cols-2 md:gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className=" bg-white flex justify-between px-5 py-6 rounded-lg shadow-lg"
            >
              <div className=" relative">
                <p
                  className={`absolute -top-4 -left-6 px-4 py-1 text-white text-xs font-bold uppercase text- ${
                    activity.category === 1 ? " bg-lime-500" : "bg-orange-500"
                  }`}
                >
                  {categoryName(+activity.category)}
                </p>
                <p className=" text-lg font-bold text-gray-700 pt-5 md:text-xl">
                  {activity.name}
                </p>
                <p className=" text-xl font-black text-lime-500 md:text-2xl">
                  {activity.calories} Calorias
                </p>
              </div>

              <div className=" flex flex-col gap-2">
                <button
                  onClick={() =>
                    dispatch({
                      type: "set-activeId",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <PencilSquareIcon className=" w-5 h-5 text-gray-500 md:w-6 md:h-6" />
                </button>

                <button
                  onClick={() =>
                    dispatch({
                      type: "deleted-activity",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <TrashIcon className=" w-5 h-5 text-red-500 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
