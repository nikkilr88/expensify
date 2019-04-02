import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'

import 'normalize.css/normalize.css'
import './styles/styles.scss'

import AppRouter from './routers/AppRouter'

const store = configureStore()

store.dispatch(setTextFilter('water'))

store.dispatch(
  addExpense({ description: 'Water Bill', amount: 14000, createdAt: -1000 })
)
store.dispatch(
  addExpense({ description: 'Electric Bill', amount: 12000, createdAt: -1000 })
)

const state = store.getState()

console.log(getVisibleExpenses(state.expenses, state.filters))

ReactDOM.render(<AppRouter />, document.getElementById('root'))
