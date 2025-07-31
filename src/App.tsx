import { useEffect, useMemo } from 'react';
import BudgetForm from './components/BudgetForm';
import useBudget from './hooks/useBudget';
import FormTracker from './components/FormTracker';
import ExpenseModal from './components/ExpenseModal';
import ExpenseList from './components/ExpenseList';
import FilterExpenses from './components/FilterExpenses';

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);
  const isValidExpense = useMemo(
    () => state.expenses.length > 0,
    [state.expenses]
  );

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
    localStorage.setItem('expense', JSON.stringify(state.expenses));
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">

      <header className="w-full flex justify-center mb-8">
        <div className='w-full max-w-5xl bg-gray-700 shadow-xl rounded-xl p-6 mb-8 border border-gray-600'>
          <h1 className="text-5xl font-extrabold text-emerald-400 text-center">Budgenix</h1>
        </div>
      </header>

      <main className="w-full max-w-5xl bg-gray-700 shadow-xl rounded-xl p-4 sm:p-6 border border-gray-600">
        <section className="mb-8 p-4 sm:p-8 bg-gray-900 rounded-lg shadow-inner border border-gray-600">
          {isValidBudget ? <FormTracker /> : <BudgetForm />}
        </section>

        {isValidExpense && (
          <section className='mb-8 p-8 bg-gray-900 rounded-lg shadow-inner border border-gray-700'>
            <FilterExpenses />
          </section>
        )}

        <section>
          {isValidBudget && (
            <div className=' max-w-4xl mx-auto'>
              <ExpenseList />
              <ExpenseModal />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
