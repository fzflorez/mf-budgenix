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
    <div className=' space-y-10'>
      <header className=' bg-gray-500 p-5'>
        <div className=' max-w-7xl mx-auto'>
          <h1 className=' text-4xl text-center font-bold text-gray-200 md:text-5xl md:text-left'>
            Budgenix
          </h1>
        </div>
      </header>

      <main className=' space-y-10 pb-10 px-4 md:px-8 lg:px-0'>
        <section className=' bg-white shadow-lg rounded-md px-5 py-8 max-w-4xl mx-auto md:p-10'>
          {isValidBudget ? <FormTracker /> : <BudgetForm />}
        </section>

        {isValidExpense && (
          <section className=' bg-white shadow-lg rounded-md px-4 py-6 max-w-4xl mx-auto md:p-10'>
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
