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
  console.log(store.getState())
})

const expenseOne = store.dispatch(
  addExpense({ description: 'Udemy course', amount: 10000 })
)

const expenseTwo = store.dispatch(
  addExpense({ description: 'Pizza', amount: 14000 })
)

store.dispatch(removeExpense({ id: expenseOne.expense.id }))

store.dispatch(editExpense(expenseTwo.expense.id, { amount: 10000 }))

store.dispatch(setTextFilter('rent'))
