import { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext'

export default function useBudget() {
  const context = useContext(BudgetContext)
  return context
}
