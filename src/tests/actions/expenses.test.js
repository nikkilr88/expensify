import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])

// Test remove expense action
test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

// Test edit expense action
test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'This is a note.' })

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: { note: 'This is a note.' }
  })
})

// Test add expense action
test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[0])

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  })
})

//
test('Should add expense to firebase and store', done => {
  const store = createMockStore({})

  const expenseData = {
    description: 'Mouse',
    amount: 1000,
    note: '',
    createdAt: 1000
  }

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions()
      expect(
        actions[0].toEqual({
          type: 'ADD_EXPENSE',
          expense: {
            id: expect.any(String),
            ...expenseData
          }
        })
      )
      done()
    })
    .catch(e => console.log(e))
})

// test('Should add expense with default values and store', () => {})

// test('should setup add expense action object with default values', () => {
//   const action = addExpense()

//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0,
//       id: expect.any(String)
//     }
//   })
// })
