import authReducer from '../../reducers/auth'

test('should set uid after user login', () => {
  const uid = '123uid'
  const state = authReducer(undefined, { type: 'LOGIN', uid })

  expect(state.uid).toBe(uid)
})

test('should set state to empty object after user logout', () => {
  const state = authReducer(undefined, { type: 'LOGOUT' })

  expect(state).toEqual({})
})
