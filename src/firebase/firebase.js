import * as firebase from 'firebase'
import expenses from '../tests/fixtures/expenses'

const config = {
  apiKey: 'AIzaSyCP75AQkgSBFj1L3ocSafxGIjXCUdyMIeU',
  authDomain: 'expensify-31d44.firebaseapp.com',
  databaseURL: 'https://expensify-31d44.firebaseio.com',
  projectId: 'expensify-31d44',
  storageBucket: '',
  messagingSenderId: '66641670825',
  appId: '1:66641670825:web:3dc5c943b9e14eac'
}

firebase.initializeApp(config)
const database = firebase.database()

export { firebase, database as default }

// database.ref('expenses').push({
//   description: 'rent',
//   amount: 150000,
//   note: '',
//   createdAt: 0
// })

// database
//   .ref('expenses')
//   .once('value')
//   .then(snapshot => {
//     const expensesArr = []
//     snapshot.forEach(childSnapshot => {
//       expensesArr.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       })
//     })

//     console.log(expensesArr)
//   })

database.ref('expenses').on('value', snapshot => {
  const expensesArr = []
  snapshot.forEach(childSnapshot => {
    expensesArr.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    })
  })

  console.log(expensesArr)
})
