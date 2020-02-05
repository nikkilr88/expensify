import { login, logout } from '../../actions/auth'

test('should correctly generate login action object', () => {
  const uid = '123uid'
  const action = login(uid)

  expect(action).toEqual({
    type: 'LOGIN',
    uid
  })
})

test('should correctly generate logout action object', () => {
  const action = logout()

  expect(action).toEqual({
    type: 'LOGOUT'
  })
})
