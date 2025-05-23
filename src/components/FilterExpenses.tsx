import { ChangeEvent } from 'react';
import { categories } from '../data/categories';
import useBudget from '../hooks/useBudget';

export default function FilterExpenses() {
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'filter-category', payload: { id: e.target.value } });
  };

  return (
    <form>
      <div className=' flex flex-col md:flex-row md:items-center gap-5'>
        <label htmlFor='category'>Filtrar Gastos</label>
        <select
          id='category'
          className=' bg-slate-100 p-2 flex-1 rounded outline-none md:p-3'
          onChange={handleChange}
        >
          <option value=''>-- Todas las Categorías --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
