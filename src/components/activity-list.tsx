import { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";
import { Dumbbell, PencilIcon, Trash2Icon, Utensils } from "lucide-react";

type ActivityListProps = {
  activities: Activity[];
  dispatch: React.ActionDispatch<[action: ActivityActions]>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-green-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-green-300 pb-2">
        Comida y Actividades
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Aún no hay actividades registradas. ¡Empieza a agregar!
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-center justify-between p-4 rounded-xl shadow-md transition duration-200 ease-in-out transform ${
                activity.category === 1
                  ? "bg-yellow-50 border-l-4 border-yellow-400"
                  : "bg-blue-50 border-l-4 border-blue-400"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    activity.category === 1
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {activity.category === 1 ? (
                    <Utensils size={20} />
                  ) : (
                    <Dumbbell size={20} />
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {activity.name}
                  </p>
                  <p
                    className={`font-black text-2xl ${
                      activity.category === 1
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  >
                    {activity.calories} Calorías
                  </p>
                </div>
              </div>

              <div className=" flex gap-1">
                <button
                  onClick={() =>
                    dispatch({
                      type: "set-activeId",
                      payload: { id: activity.id },
                    })
                  }
                  className="hover:bg-gray-200 rounded p-1 transition-all duration-300"
                >
                  <PencilIcon size={20} className="text-green-500" />
                </button>

                <button
                  onClick={() =>
                    dispatch({
                      type: "deleted-activity",
                      payload: { id: activity.id },
                    })
                  }
                  className="hover:bg-gray-200 rounded p-1 transition-all duration-300"
                >
                  <Trash2Icon size={20} className=" text-red-500 " />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
