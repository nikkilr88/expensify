import { firebase, googleAuthProvider } from '../firebase/firebase'

export const startLogin = () => {
  console.log('logging in...')
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider)
  }
}

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut()
  }
}
