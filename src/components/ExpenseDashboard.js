import React from 'react'
import { Link } from 'react-router-dom'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'

const ExpenseDashboard = () => (
  <div>
    <p>this is the dashboard</p>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
)

export default ExpenseDashboard
