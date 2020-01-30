import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  startAddExpense,
  addExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses'
import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach(done => {
  const expensesData = {}
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expensesData[id] = { description, amount, note, createdAt }
  })
  database
    .ref('expenses')
    .set(expensesData)
    .then(() => done())
})

// Test remove expense action
test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should remove expense from database', done => {
  const store = createMockStore({})
  const id = expenses[0].id

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      })

      return database.ref(`expenses/${id}`).once('value')
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy()
      done()
    })
})

test('should edit expense from firebase', done => {
  const store = createMockStore({})

  const id = expenses[0].id
  const updates = { amount: 2000 }
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      })

      return database.ref(`expenses/${id}`).once('value')
    })
    .then(snapshot => {
      expect(snapshot.val().amount).toBe(updates.amount)
      done()
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
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      })

      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData)
      done()
    })
})

test('Should add expense with default values and store', done => {
  const store = createMockStore({})

  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      })

      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseDefaults)
      done()
    })
})

test('should setup set expense action object', () => {
  const action = setExpenses(expenses)
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
})

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[0]]
  }

  const state = expensesReducer(expenses, action)

  expect(state).toEqual([expenses[0]])
})

test('should fetch expenses from firebase', () => {
  const store = createMockStore({})

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    })

    done()
  })
})
