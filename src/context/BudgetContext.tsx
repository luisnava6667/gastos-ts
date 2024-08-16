import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react'
import {
  budgetReducer,
  initialState,
  BudgetState,
  BudgetActions
} from '../reducers/budget-reducer'

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpenses: number
  remainingBudget: number
}
type BudgetproviderProps = {
  children: ReactNode
}
export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetproviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)
  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  )
  const remainingBudget = state.budget - totalExpenses
  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, remainingBudget }}>
      {children}
    </BudgetContext.Provider>
  )
}
