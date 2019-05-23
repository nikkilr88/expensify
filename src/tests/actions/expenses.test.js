import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

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
  const expenseData = {
    description: 'Rent',
    amount: 20000,
    createdAt: 1000,
    note: 'Rent for June'
  }

  const action = addExpense(expenseData)

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
})

test('should setup add expense action object with default values', () => {
  const action = addExpense()

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  })
})
