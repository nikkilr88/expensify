import React, { Component } from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

class ExpenseForm extends Component {
  state = {
    description: '',
    amount: '',
    note: '',
    createdAt: moment(),
    focused: false
  }

  onChange = e => {
    e.persist()
    this.setState(() => ({
      [e.target.name]: e.target.value
    }))
  }

  onAmountChange = e => {
    const amount = e.target.value
    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amount
      }))
    }
  }

  onDateChange = createdAt => {
    this.setState(() => ({
      createdAt
    }))
  }

  onFocusChange = ({ focused }) => {
    this.setState(prevState => ({
      focused
    }))
  }

  render() {
    return (
      <div>
        <form>
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
