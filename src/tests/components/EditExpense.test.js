import React from 'react'
import { shallow } from 'enzyme'
import { EditExpense } from '../../components/EditExpense'
import expenses from '../fixtures/expenses'

let startEditExpense, startRemoveExpense, history, wrapper, expense, match

beforeEach(() => {
  startEditExpense = jest.fn()
  startRemoveExpense = jest.fn()

  history = {
    push: jest.fn()
  }

  expense = expenses[0]
  match = { params: { id: expense.id } }

  wrapper = shallow(
    <EditExpense
      match={match}
      expense={expense}
      history={history}
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
    />
  )
})

test('should render EditExpense correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense correctly', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expense)

  expect(history.push).toHaveBeenLastCalledWith('/dashboard')
  expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense)
})

test('should handle removeExpense correctly', () => {
  wrapper.find('button').simulate('click')

  expect(history.push).toHaveBeenLastCalledWith('/dashboard')
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expense.id })
})
