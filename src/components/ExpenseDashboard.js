import React from 'react'
import { Link } from 'react-router-dom'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import ExpensesSummary from './ExpensesSummary'

const ExpenseDashboard = () => (
  <div>
    <p>this is the dashboard</p>
    <ExpenseListFilters />
    <ExpensesSummary />
    <ExpenseList />
  </div>
)

export default ExpenseDashboard
