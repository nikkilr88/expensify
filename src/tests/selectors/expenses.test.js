import moment from 'moment'
import getVisibleExpenses from '../../selectors/expenses'

const expenses = [
  {
    id: '1',
    description: 'rent',
    amount: 150000,
    note: '',
    createdAt: moment(0)
  },
  {
    id: '2',
    description: 'tea',
    amount: 1000,
    note: '',
    createdAt: moment(0)
      .subtract(4, 'days')
      .valueOf()
  },
  {
    id: '3',
    description: 'course',
    amount: 13500,
    note: 'udemy',
    createdAt: moment(0)
      .add(4, 'days')
      .valueOf()
  }
]

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
