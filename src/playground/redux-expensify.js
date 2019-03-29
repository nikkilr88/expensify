import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

const setTextFilter = text => ({
  type: 'SET_TEXT_FILTER',
  text
})

const expensesState = []

//Expenses reducer
const expensesReducer = (state = expensesState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      return state.filter(exp => exp.id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        }
      })
    default:
      return state
  }
}

// FILTERS

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

const setStartDate = date => ({
  type: 'SET_START_DATE',
  date
})

const setEndDate = date => ({
  type: 'SET_END_DATE',
  date
})

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const startDateMatch =
      typeof startDate !== 'number' || expense.createdAt >= startDate
    const endDateMatch =
      typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = expense.description
      .toLowerCase()
      .includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch
  })
}

const filtersState = {
  text: '',
  sortBy: 'date', // date or amount
  startDate: undefined,
  endDate: undefined
}

//Filters reducer
const filtersReducer = (state = filtersState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date
      }
    default:
      return state
  }
}

//Create store
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
)

store.subscribe(() => {
  const state = store.getState()
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses)
})

const expenseOne = store.dispatch(
  addExpense({ description: 'Udemy course', amount: 10000, createdAt: 1000 })
)

const expenseTwo = store.dispatch(
  addExpense({ description: 'Pizza', amount: 14000, createdAt: -1000 })
)

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 10000 }))

// store.dispatch(setTextFilter('rent'))

// store.dispatch(sortByAmount())

// store.dispatch(sortByDate())

// store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))
store.dispatch(setTextFilter('course'))
