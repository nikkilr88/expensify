import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from '../actions/filters'

class ExpenseListFilters extends Component {
  state = {
    calendarFocused: null
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate))
    this.props.dispatch(setEndDate(endDate))
  }

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }))
  }

  render() {
    const { dispatch, filters } = this.props

    return (
      <div>
        <input
          type='text'
          value={filters.text}
          onChange={e => {
            dispatch(setTextFilter(e.target.value))
          }}
        />
        <select
          value={filters.sortBy}
          onChange={e => {
            if (e.target.value === 'date') {
              dispatch(sortByDate())
            } else {
              dispatch(sortByAmount())
            }
          }}
        >
          <option value='date'>Date</option>
          <option value='amount'>Amount</option>
        </select>
        <DateRangePicker
          startDate={filters.startDate}
          endDate={filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters
})

export default connect(mapStateToProps)(ExpenseListFilters)
