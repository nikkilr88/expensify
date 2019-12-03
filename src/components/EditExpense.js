import React, { Component } from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { editExpense, startRemoveExpense } from '../actions/expenses'

export class EditExpense extends Component {
  onSubmit = (id, expense) => {
    this.props.editExpense(id, expense)
    this.props.history.push('/dashboard')
  }

  onClick = id => {
    this.props.startRemoveExpense(id)
    this.props.history.push('/dashboard')
  }

  render() {
    return (
      <div>
        <p>Edit expense {this.props.match.params.id}</p>

        <ExpenseForm
          expense={this.props.expense}
          onSubmit={expense => {
            this.onSubmit(this.props.expense.id, expense)
          }}
        />

        <button
          onClick={() => {
            this.onClick({ id: this.props.expense.id })
          }}
        >
          Remove
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id))
})

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense)
