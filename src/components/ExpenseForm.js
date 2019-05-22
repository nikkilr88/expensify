import React, { Component } from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

class ExpenseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: props.expense ? props.expense.description : '',
      amount: props.expense
        ? (props.expense.amount / 100).toString() + '.00'
        : '',
      note: props.expense ? props.expense.note : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      focused: false
    }
  }

  onChange = e => {
    e.persist()
    this.setState(() => ({
      [e.target.name]: e.target.value
    }))
  }

  onAmountChange = e => {
    const amount = e.target.value
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amount
      }))
    }
  }

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({
        createdAt
      }))
    }
  }

  onFocusChange = ({ focused }) => {
    this.setState(prevState => ({
      focused
    }))
  }

  onSubmit = e => {
    e.preventDefault()

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please provide description and amount.'
      }))
    } else {
      this.setState(() => ({ error: '' }))
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <span className='error'>{this.state.error}</span>}
        <form onSubmit={this.onSubmit}>
          <input
            name='description'
            type='text'
            placeholder='Description'
            value={this.state.description}
            onChange={this.onChange}
            autoFocus
          />
          <input
            name='amount'
            type='text'
            value={this.state.amount}
            onChange={this.onAmountChange}
            placeholder='Amount'
          />

          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.focused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />

          <textarea
            name='note'
            value={this.state.note}
            onChange={this.onChange}
            placeholder='Add a note for you expense (optional)'
          />

          <button>Save Expense</button>
        </form>
      </div>
    )
  }
}

export default ExpenseForm
