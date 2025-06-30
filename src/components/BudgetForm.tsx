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
      <div className=' space-y-1'>
        <h2 className=' w-full text-center text-2xl font-bold text-gray-600 inline-block md:text-3xl lg:text-4xl'>
          Definir Presupuesto
        </h2>
        <p className='text-center text-gray-500 mb-6 text-sm md:text-base'>
          Ingrese el monto total disponible para su presupuesto
        </p>
      </div>

      <div className='flex items-center gap-2 border border-gray-400 rounded-lg px-4 py-2 mt-10 mb-4 md:mt-12 md:mb-6'>
        <span className='text-gray-500 text-base font-bold md:text-lg'>$</span>
        <input
          type='number'
          className='flex-1 bg-transparent outline-none text-base font-bold text-gray-600 md:text-lg placeholder:text-gray-400 placeholder:font-semibold'
          placeholder='Ingrese su presupuesto. Ej: 1000, 5000, 10000'
          value={budget === 0 ? '' : budget}
          onChange={handleChange}
        />
      </div>

      <input
        type='submit'
        value='Ingresar Presupuesto'
        className={` w-full bg-emerald-500 text-gray-200 font-semibold p-2 text-base transition-colors duration-300 md:text-lg ${
          budget <= 0 ? 'opacity-50 ' : 'cursor-pointer hover:bg-emerald-600'
        }`}
      />
    </form>
  );
}
