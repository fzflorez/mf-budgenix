import { ChangeEvent, useEffect, useState } from 'react';
import { categories } from '../data/categories';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { DraftExpense, Value } from '../types';
import Message from './Message';
import useBudget from '../hooks/useBudget';

export default function ExpenseForm() {
  const { state, dispatch, availableBudget } = useBudget();
  const [expense, setExpense] = useState<DraftExpense>({
    name: '',
    price: 0,
    category: '',
    date: new Date(),
  });
  const [error, setError] = useState('');
  const [previusAmount, setPreviusAmount] = useState(0);

  useEffect(() => {
    if (state.editingId) {
      const editExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];
      setExpense(editExpense);
      setPreviusAmount(editExpense.price);
    }
  }, [state.editingId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const isNumber = ['price'].includes(e.target.id);
    setExpense({
      ...expense,
      [e.target.id]: isNumber ? +e.target.value : e.target.value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const isValidExpense = () => {
    if (Object.values(expense).includes('') || expense.name.trim() === '') {
      setError('Todos los campos son obligatorios.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (expense.price <= 0) {
      setError('El Precio debe ser mayor a 0.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (expense.price - previusAmount > availableBudget) {
      setError('Presupuesto agotado.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (state.editingId) {
      dispatch({
        type: 'update-expense',
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({ type: 'add-expense', payload: { expense } });
    }

    setExpense({
      name: '',
      price: 0,
      category: '',
      date: new Date(),
    });
  };

  return (
    <form className=' space-y-6'>
      <h2 className=' w-full text-center text-3xl font-bold text-emerald-600 border-b-4 border-emerald-600 pb-2 md:text-4xl'>
        {state.editingId ? 'Editando Gasto' : 'Nuevo Gasto'}
      </h2>

      {error && <Message>{error}</Message>}

      <div className=' space-y-4'>
        <div className=' space-y-2'>
          <label htmlFor='name' className=' text-lg font-bold md:text-xl'>
            Nombre del Gasto:
          </label>
          <input
            type='texto'
            id='name'
            placeholder='Ej: Medicina, Transporte, Comida, Suscripciones, etc.'
            className=' w-full bg-gray-200 border-2 border-gray-300 rounded-md outline-none p-1 md:p-2'
            value={expense.name}
            onChange={handleChange}
          />
        </div>

        <div className=' space-y-2'>
          <label htmlFor='price' className=' text-lg font-bold md:text-xl'>
            Precio:
          </label>
          <input
            type='number'
            id='price'
            className=' w-full bg-gray-200 border-2 border-gray-300 rounded-md outline-none p-1 md:p-2'
            value={expense.price}
            onChange={handleChange}
          />
        </div>

        <div className=' space-y-2'>
          <label htmlFor='category' className=' text-lg font-bold md:text-xl'>
            Categoría:
          </label>
          <select
            id='category'
            className=' w-full bg-gray-200 border-2 border-gray-300 rounded-md outline-none p-1 md:p-2'
            value={expense.category}
            onChange={handleChange}
          >
            <option value=''>--Seleccione--</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className=' space-y-2'>
          <p className=' text-lg font-bold md:text-xl'>Fecha del Gasto:</p>
          <DatePicker
            className=' w-full bg-gray-200 border-2 border-gray-300 rounded-md outline-none p-1 md:p-2'
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>
      </div>

      <input
        type='button'
        value={state.editingId ? 'Guardar Gasto' : 'Registrar Gasto'}
        className=' w-full bg-emerald-600 text-gray-200 font-semibold text-base py-2 px-4 cursor-pointer transition-colors duration-300 md:text-xl'
        onClick={isValidExpense}
      />
    </form>
  );
}
