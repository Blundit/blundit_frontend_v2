import { UserLogin, UserLogout } from './../utilities/UserLogin';

it('UserLogin: UserLogin exists', () => {
  expect(UserLogin).not.toBe(null);
})

it('UserLogin: UserLogout exists', () => {
  expect(UserLogout).not.toBe(null);
})

it('UserLogin: UserLogin properties required', () => {
  let attempt = UserLogin()
  let response = { errors: ["username_required", "password_required"] }
  expect(attempt).toEqual(response)
})

it('UserLogin: UserLogin catches empty parameters', () => {
  let attempt = UserLogin(" ", " ");
  let response = { errors: ["username_required", "password_required"] }
  expect(attempt).toEqual(response)
})

