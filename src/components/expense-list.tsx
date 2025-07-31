import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import ExpenseDetails from "./expense-details";

export default function ExpenseList() {
  const { state } = useBudget();

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter(
        (expense) => expense.category === state.currentCategory
      )
    : state.expenses;
  const isValidExpense = useMemo(
    () => filteredExpenses.length === 0,
    [filteredExpenses]
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">
        Tus Gastos
      </h2>

      {isValidExpense ? (
        <p className="text-center text-gray-400 text-lg mt-8">
          Aún no hay gastos registrados! Empieza a añadir algunos.
        </p>
      ) : (
        <div className=" space-y-4 md:space-y-6">
          {filteredExpenses.map((expense) => (
            <ExpenseDetails key={expense.id} expense={expense} />
          ))}
        </div>
      )}
    </div>
  );
}
