import moment from 'moment'
import { getVisibleExpenses, getExpensesTotal } from '../../selectors/expenses'
import expenses from '../fixtures/expenses'

// GET VISIBLE EXPENSES
test('should filter by text value', () => {
  const filters = {
    text: 'rent',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters)

  expect(result).toEqual([expenses[0]])
})

test('should filter by start date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters)

  expect(result).toEqual([expenses[2], expenses[0]])
})

test('should filter by end date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0)
  }
  const result = getVisibleExpenses(expenses, filters)

  expect(result).toEqual([expenses[0], expenses[1]])
})

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters)

  expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
})

test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const result = getVisibleExpenses(expenses, filters)

  expect(result).toEqual([expenses[0], expenses[2], expenses[1]])
})

// GET EXPENSES TOTAL
test('should return 0 if no expenses', () => {
  const result = getExpensesTotal()
  expect(result).toEqual(0)
})

test('should correctly add up a single expense', () => {
  const result = getExpensesTotal([expenses[1]])
  expect(result).toEqual(1000)
})

test('should correctly add up multiple expenses', () => {
  const result = getExpensesTotal(expenses)
  expect(result).toEqual(164500)
})
