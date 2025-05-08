import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from '../reducers/budget-reducer';

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalSpent: number;
  availableBudget: number;
};

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalSpent = useMemo(
    () => state.expenses.reduce((total, expense) => expense.price + total, 0),
    [state.expenses]
  );

  const availableBudget = state.budget - totalSpent;

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalSpent,
        availableBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
