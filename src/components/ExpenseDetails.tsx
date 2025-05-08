import { useMemo } from 'react';
import { Expense } from '../types';
import { categories } from '../data/categories';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import DisplayAmount from './DisplayAmount';
import useBudget from '../hooks/useBudget';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from '../helpers';

type ExpenseDetailsProps = {
  expense: Expense;
};

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  const { dispatch } = useBudget();

  const categoriesInfo = useMemo(
    () => categories.filter((category) => category.id === expense.category)[0],
    [expense]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: 'set-expense-by-id', payload: { id: expense.id } })
        }
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: 'remove-expense', payload: { id: expense.id } })
        }
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className=' w-full bg-white shadow-lg rounded-md px-4 py-6 max-w-4xl mx-auto flex flex-col justify-center items-center sm:flex-row sm:p-6 md:p-10 gap-5'>
          <div>
            <img
              src={`/images/icono_${categoriesInfo.icon}.svg`}
              alt='Imagen Categoría'
              className=' w-14 md:w-20'
            />
          </div>

          <div className=' flex-1 space-y-1'>
            <p className=' text-xl font-bold text-gray-500 uppercase'>
              {categoriesInfo.name}
            </p>
            <p className=' text-2xl font-bold text-gray-600'>{expense.name}</p>
            <p>{formatDate(expense.date!.toString())}</p>
          </div>

          <DisplayAmount amount={expense.price} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
