import { ChangeEvent, useEffect, useState } from "react";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "../date-picker-dark.css";
import { DraftExpense, Value } from "../types";
import useBudget from "../hooks/useBudget";
import ErrorMessage from "./error-message";
import ExpenseLabel from "./expense-label";

export default function ExpenseForm() {
  const { state, dispatch, availableBudget } = useBudget();
  const [expense, setExpense] = useState<DraftExpense>({
    name: "",
    price: 0,
    category: "",
    date: new Date(),
  });
  const [error, setError] = useState("");
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
    const isNumber = ["price"].includes(e.target.id);
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
    if (Object.values(expense).includes("") || expense.name.trim() === "") {
      setError("Todos los campos son obligatorios.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (expense.price <= 0) {
      setError("El Precio debe ser mayor a 0.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (expense.price - previusAmount > availableBudget) {
      setError("Presupuesto agotado.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }

    setExpense({
      name: "",
      price: 0,
      category: "",
      date: new Date(),
    });
  };

  return (
    <form className=" space-y-6">
      <h2 className=" w-full text-center text-3xl font-bold text-emerald-400 border-b-4 border-emerald-400 pb-2 md:text-4xl">
        {state.editingId ? "Editando Gasto" : "Nuevo Gasto"}
      </h2>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="space-y-4">
        <div className="space-y-2">
          <ExpenseLabel htmlFor="name">Nombre del Gasto:</ExpenseLabel>
          <input
            type="texto"
            id="name"
            autoComplete="off"
            placeholder="Ej: Medicina, Transporte, Comida, Suscripciones, etc."
            className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md outline-none py-3 px-4"
            value={expense.name}
            onChange={handleChange}
          />
        </div>

        <div className=" space-y-2">
          <ExpenseLabel htmlFor="price">Precio:</ExpenseLabel>
          <input
            type="number"
            id="price"
            placeholder="Ej: 100, 500, 1000, etc."
            className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md outline-none py-3 px-4"
            value={expense.price === 0 ? "" : expense.price}
            onChange={handleChange}
          />
        </div>

        <div className=" space-y-2">
          <ExpenseLabel htmlFor="category">Categoría:</ExpenseLabel>
          <select
            id="category"
            className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md outline-none py-3 px-4"
            value={expense.category}
            onChange={handleChange}
          >
            <option value="">-- Selecciona una Categoría --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <p className="text-base text-gray-200 font-semibold md:text-lg">
            Fecha del Gasto:
          </p>
          <DatePicker
            className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md outline-none py-3 px-4"
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-blue-400 hover:bg-blue-500 text-white text-base md:text-lg font-bold py-3 px-6 rounded-md shadow-md transition duration-300 ease-in-out transform"
        onClick={isValidExpense}
      >
        {state.editingId ? "Guardar Gasto" : "Registrar Gasto"}
      </button>
    </form>
  );
}
