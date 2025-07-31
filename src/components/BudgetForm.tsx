import { ChangeEvent, FormEvent, useState } from 'react';
import useBudget from '../hooks/useBudget';

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'add-budget', payload: { budget } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl md:text-3xlfont-bold text-emerald-400 mb-6 text-center">
        Define tu Presupuesto
      </h2>
      <p className="text-gray-300 mb-8 text-center text-base md:text-lg">Ingresa el monto total que deseas asignar para tu presupuesto mensual.</p>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="relative w-full lg:w-2/3">
          <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl md:text-2xl font-bold">$</span>
          <input 
            type="number" 
            placeholder="Ej: 1000, 5000, 10000"
            className="w-full pl-8 md:pl-12 pr-6 py-3 sm:py-4 bg-gray-700 border border-gray-600 rounded-lg outline-none text-gray-100 text-base md:text-lg placeholder-gray-400 transition duration-300"
            value={budget === 0 ? '' : budget}
            onChange={handleChange}
          />
        </div>
        <button
          className={`w-full lg:w-1/3 bg-emerald-600 text-white text-base md:text-lg font-semibold py-3 px-6 sm:py-4 rounded-lg transition duration-300 ease-in-out transform ${budget <= 0 ? 'opacity-50 cursor-default' : 'cursor-pointer hover:bg-emerald-700'}`}
        >
          Establecer Presupuesto
        </button>
      </div>
    </form>
  );
}
