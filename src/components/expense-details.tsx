import { useMemo } from "react";
import { Expense } from "../types";
import { categories } from "../data/categories";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import useBudget from "../hooks/useBudget";
import "react-swipeable-list/dist/styles.css";
import { formatDate } from "../helpers";

type ExpenseDetailsProps = {
  expense: Expense;
};

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  const { dispatch } = useBudget();

  const categoriesInfo = useMemo(
    () => categories.filter((category) => category.id === expense.category)[0],
    [expense]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "set-expense-by-id", payload: { id: expense.id } })
        }
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "remove-expense", payload: { id: expense.id } })
        }
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="w-full bg-gray-700 border border-gray-600 rounded-lg p-6 flex flex-col md:flex-row md:justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img
              src={`/images/icono_${categoriesInfo.icon}.svg`}
              alt="Imagen Categoría"
              className=" w-14 md:w-16"
            />

            <div className="space-y-1">
              <p className=" text-xl md:text-2xl font-bold text-gray-200">
                {expense.name}
              </p>
              <p className="text-gray-300 text-sm md:text-base">
                {formatDate(expense.date!.toString())}
              </p>
            </div>
          </div>

          <p className="font-bold text-2xl md:text-3xl text-emerald-400 flex-shrink-0">
            {expense.price}
          </p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
