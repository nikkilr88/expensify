import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />)

  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm correctly with data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)

  expect(wrapper).toMatchSnapshot()
})

test('should render error message for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />)

  expect(wrapper).toMatchSnapshot()

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })

  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
  const name = 'description'
  const value = 'new description'
  const wrapper = shallow(<ExpenseForm />)

  expect(wrapper).toMatchSnapshot()

  wrapper
    .find('input')
    .at(0)
    .simulate('change', {
      persist: () => {},
      target: { value, name }
    })

  expect(wrapper.state('description')).toBe(value)
  expect(wrapper).toMatchSnapshot()
})

test('should set note on textarea change', () => {
  const name = 'note'
  const value = 'new note'
  const wrapper = shallow(<ExpenseForm />)

  expect(wrapper).toMatchSnapshot()

  wrapper.find('textarea').simulate('change', {
    persist: () => {},
    target: { value, name }
  })

  expect(wrapper.state('note')).toBe(value)
  expect(wrapper).toMatchSnapshot()
})

test('should set amount if valid', () => {
  const value = '1.25'
  const wrapper = shallow(<ExpenseForm />)

  expect(wrapper).toMatchSnapshot()

  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: { value }
    })

  expect(wrapper.state('amount')).toBe(value)
  expect(wrapper).toMatchSnapshot()
})

test('should not set amount if invalid', () => {
  const value = '1.255'
  const wrapper = shallow(<ExpenseForm />)

  expect(wrapper).toMatchSnapshot()

  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: { value }
    })

  expect(wrapper.state('amount')).toBe('')
  expect(wrapper).toMatchSnapshot()
})
