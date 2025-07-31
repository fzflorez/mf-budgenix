import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import useBudget from "../hooks/useBudget";

export default function FilterExpenses() {
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "filter-category", payload: { id: e.target.value } });
  };

  return (
    <form>
      <label
        htmlFor="category"
        className="block text-gray-300 text-lg font-medium mb-3"
      >
        Filtrar Gastos por Categoría:
      </label>
      <select
        id="category"
        className="w-full py-3 px-4 bg-gray-700 border border-gray-600 rounded-lg outline-none text-gray-100 text-base transition duration-300"
        onChange={handleChange}
      >
        <option value="">-- Todas las Categorías --</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </form>
  );
}
