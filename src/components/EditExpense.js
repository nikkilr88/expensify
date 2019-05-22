import React, { Component } from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, removeExpense } from '../actions/expenses'

const EditExpense = props => {
  return (
    <div>
      <p>Edit expense {props.match.params.id}</p>

      <ExpenseForm
        expense={props.expense}
        onSubmit={expense => {
          props.dispatch(editExpense(props.expense.id, expense))
          props.history.push('/dashboard')
        }}
      />

      <button
        onClick={() => {
          props.dispatch(removeExpense({ id: props.expense.id }))
          props.history.push('/dashboard')
        }}
      >
        Remove
      </button>
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
})

export default connect(mapStateToProps)(EditExpense)
