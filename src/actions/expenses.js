import uuid from 'uuid'
import database from '../firebase/firebase'

// ADD EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
})

export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData

    const expense = {
      description,
      note,
      amount,
      createdAt
    }

    return database
      .ref('expenses')
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        )
      })
  }
}

// EDIT EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// REMOVE EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

// SET EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
})

export const startSetExpenses = () => {
  return dispatch => {
    return database.ref('expenses').once('value', snapshot => {
      const expensesArray = []

      snapshot.forEach(childSnapshot => {
        expensesArray.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })

      console.log({ expensesArray })
      dispatch(setExpenses(expensesArray))
    })
  }
}
