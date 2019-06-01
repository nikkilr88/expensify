import moment from 'moment'
import filtersReducer from '../../reducers/flters'

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' })

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should set sort by amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })

  expect(state.sortBy).toBe('amount')
})

test('should set sort by date', () => {
  const filtersState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const state = filtersReducer(filtersState, { type: 'SORT_BY_DATE' })

  expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
  const text = 'cookie'
  const state = filtersReducer(undefined, {
    type: 'SET_TEXT_FILTER',
    text
  })

  expect(state.text).toBe(text)
})

test('should set start date filter', () => {
  const date = moment()

  const filtersState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const state = filtersReducer(filtersState, {
    date,
    type: 'SET_START_DATE'
  })

  expect(state.startDate).toEqual(date)
})

test('should set end date filter', () => {
  const date = moment()

  const filtersState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const state = filtersReducer(filtersState, {
    date,
    type: 'SET_END_DATE'
  })

  expect(state.endDate).toEqual(date)
})
