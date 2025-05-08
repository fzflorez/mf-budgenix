import { Category, DraftExpense, Expense } from '../types'
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions =
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'show-modal' } |
  { type: 'close-modal' } |
  { type: 'add-expense', payload: { expense: DraftExpense } } |
  { type: 'remove-expense', payload: { id: Expense['id'] } } |
  { type: 'set-expense-by-id', payload: { id: Expense['id'] } } |
  { type: 'update-expense', payload: { expense: Expense } } |
  { type: 'restart-app' } |
  { type: 'filter-category', payload: { id: Category['id'] } }

export type BudgetState = {
  budget: number
  modal: boolean
  expenses: Expense[]
  editingId: Expense['id']
  currentCategory: Category['id']
}

const initialBudget = () => {
  const localStorageBudget = localStorage.getItem('budget')
  return localStorageBudget ? +localStorageBudget : 0
}

const initialExpense = () => {
  const localStorageExpense = localStorage.getItem('expense')
  return localStorageExpense ? JSON.parse(localStorageExpense) : []
}

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpense(),
  editingId: '',
  currentCategory: ''
}

const createId = (draftExpenses: DraftExpense): Expense => {
  return {
    ...draftExpenses,
    id: uuidv4()
  }
}

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {

  if (action.type === 'add-budget') {

    return {
      ...state,
      budget: action.payload.budget
    }
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true
    }
  }

  if (action.type === 'close-modal') {
    return {
      ...state,
      modal: false,
      editingId: ''
    }
  }

  if (action.type === 'add-expense') {
    const expense = createId(action.payload.expense)

    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false
    }
  }

  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
    }
  }

  if (action.type === 'set-expense-by-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true
    }
  }

  if (action.type === 'update-expense') {
    return {
      ...state,
      expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
      modal: false,
      editingId: ''
    }
  }

  if (action.type === 'restart-app') {
    return {
      ...state,
      budget: 0,
      expenses: []
    }
  }

  if (action.type === 'filter-category') {
    return {
      ...state,
      currentCategory: action.payload.id
    }
  }

  return state
}