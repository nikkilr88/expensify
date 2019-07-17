import React from 'react'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { getVisibleExpenses, getExpensesTotal } from '../selectors/expenses'

export const ExpensesSummary = ({ expenseCount, expenseTotal }) => {
  return (
    <h3>
      Viewing {expenseCount} expense(s) totaling{' '}
      {numeral(expenseTotal / 100).format('$0,0.00')}
    </h3>
  )
}

const mapStateToProps = state => {
  const expenses = getVisibleExpenses(state.expenses, state.filters)
  return {
    expenseCount: expenses.length,
    expenseTotal: getExpensesTotal(expenses)
  }
}

export default connect(mapStateToProps)(ExpensesSummary)
