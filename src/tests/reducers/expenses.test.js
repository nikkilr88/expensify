import moment from 'moment'
import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' })

  expect(state).toEqual([])
})

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }

  const state = expensesReducer(expenses, action)

  expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }

  const state = expensesReducer(expenses, action)

  expect(state).toEqual(expenses)
})

test('should add expense', () => {
  const expense = {
    id: '4',
    description: 'test',
    amount: 1000,
    note: '',
    createdAt: moment()
  }

  const state = expensesReducer(expenses, {
    type: 'ADD_EXPENSE',
    expense
  })

  expect(state).toEqual([...expenses, expense])
})

test('should edit expense', () => {
  const updates = {
    note: 'Note'
  }

  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates
  })

  expect(state[0].note).toBe(updates.note)
})

test('should not edit expense if not found', () => {
  const updates = {
    note: 'Note'
  }

  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates
  })

  expect(state).toEqual(expenses)
})
