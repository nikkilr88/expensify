import React, { Component } from 'react'

class ExpenseForm extends Component {
  state = {
    description: '',
    amount: '',
    note: ''
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
