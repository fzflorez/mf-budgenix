import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import useBudget from "../hooks/useBudget";
import DisplayAmount from "./display-amount";
import "react-circular-progressbar/dist/styles.css";
import { useMemo } from "react";

export default function FormTracker() {
  const { state, dispatch, totalSpent, availableBudget } = useBudget();
  const percentage = +((totalSpent / state.budget) * 100).toFixed(2);
  const isValidExpense = useMemo(() => state.expenses.length, [state.expenses]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
      <div className="relative w-48 h-48 flex items-center justify-center col-span-1 md:col-span-1 lg:col-span-1">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor:
              percentage < 51
                ? "#34D399"
                : percentage < 76
                ? "#FBBF24"
                : percentage < 91
                ? "#FB923C"
                : "#EF4444",
            trailColor: "#374151",
            textSize: 10,
            textColor:
              percentage < 51
                ? "#34D399"
                : percentage < 76
                ? "#FBBF24"
                : percentage < 91
                ? "#FB923C"
                : "#EF4444",
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col items-center md:items-start gap-4 col-span-1 md:col-span-1 lg:col-span-2 text-center md:text-left">
        <div className="text-xl text-gray-200 w-full">
          <DisplayAmount label="Presupuesto" amount={state.budget} />
          <DisplayAmount
            label="Disponible"
            amount={availableBudget}
            textColor={
              percentage < 51
                ? "text-emerald-400"
                : percentage < 76
                ? "text-yellow-400"
                : percentage < 91
                ? "text-orange-400"
                : "text-red-500"
            }
          />
          <DisplayAmount
            label="Gastado"
            amount={totalSpent}
            textColor={
              percentage < 51
                ? "text-emerald-400"
                : percentage < 76
                ? "text-yellow-400"
                : percentage < 91
                ? "text-orange-400"
                : "text-red-500"
            }
          />
        </div>

        <button
          className="w-full mt-6 bg-emerald-400 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform"
          onClick={() => dispatch({ type: "restart-app" })}
        >
          Reiniciar App
        </button>
      </div>
    </div>
  );
}
