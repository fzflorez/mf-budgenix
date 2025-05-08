import { useMemo } from 'react';
import useBudget from '../hooks/useBudget';
import ExpenseDetails from './ExpenseDetails';

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
    <div className=' space-y-4'>
      <h2 className=' text-2xl text-gray-600 font-bold text-center md:text-3xl lg:text-4xl'>
        Lista de Gastos
      </h2>

      {isValidExpense ? (
        <p className=' text-center text-base font-medium md:text-lg'>
          No hay gastos aún.
        </p>
      ) : (
        <>
          {filteredExpenses.map((expense) => (
            <ExpenseDetails key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
}
