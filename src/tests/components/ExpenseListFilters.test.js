import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
  setTextFilter = jest.fn()
  sortByDate = jest.fn()
  sortByAmount = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  )
})

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  })
  expect(wrapper).toMatchSnapshot()
})

// SPIES
// should handle text change
test('should handle text change', () => {
  const value = 'bills'

  wrapper.find('input').simulate('change', {
    target: { value }
  })

  expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

// should sort by date
test('should sort by date', () => {
  const value = 'date'

  wrapper.find('select').simulate('change', {
    target: { value }
  })

  expect(sortByDate).toHaveBeenCalled()
})

// should sort by amount
test('should sort by amount', () => {
  const value = 'amount'

  wrapper.find('select').simulate('change', {
    target: { value }
  })

  expect(sortByAmount).toHaveBeenCalled()
})

// should handle date changes
test('should handle date changes', () => {
  const startDate = altFilters.startDate
  const endDate = altFilters.endDate

  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate })

  expect(setStartDate).toHaveBeenLastCalledWith(startDate)
  expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

// STATE
// should handle date focus change
test('should handle date focus change', () => {
  const calendarFocused = 'startDate'

  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused)

  expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})
