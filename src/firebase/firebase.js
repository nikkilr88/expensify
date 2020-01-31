import * as firebase from 'firebase'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER,
  appId: process.env.FIREBASE_PROJECT_ID
}

firebase.initializeApp(config)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }

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

  // console.log(expensesArr)
})
