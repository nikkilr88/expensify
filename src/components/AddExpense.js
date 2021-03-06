import React, { Component } from 'react'
import ExpenseForm from './ExpenseForm'
import { connect } from 'react-redux'
import { startAddExpense } from '../actions/expenses'

export class AddExpense extends Component {
  onSubmit = expense => {
    this.props.startAddExpense(expense)
    this.props.history.push('/dashboard')
  }

  render() {
    return (
      <div>
        <h1>Add New Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpense)
