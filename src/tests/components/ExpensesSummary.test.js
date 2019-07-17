import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'
import expenses from '../fixtures/expenses'

test('should render ExpensesSummary correctly with no expenses', () => {
  const wrapper = shallow(<ExpensesSummary />)
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary correctly with expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={expenses.length} expenseTotal={100} />
  )
  expect(wrapper).toMatchSnapshot()
})
