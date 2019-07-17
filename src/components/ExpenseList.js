import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import { getVisibleExpenses } from '../selectors/expenses'

export const ExpenseList = ({ expenses }) => {
  return (
    <div>
      {expenses.length === 0
        ? ''
        : expenses.map((expense, i) => (
            <ExpenseListItem key={expense.id} {...expense} />
          ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList)
