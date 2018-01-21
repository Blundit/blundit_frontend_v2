import Sessions from './../../utilities/Sessions'
import Cookies from './../../utilities/Cookies'

it('Sessions: setUser fails when access token is missing ', () => {
  const data = { "uid": "67890" }
  Sessions.setUser(data)
  expect(Cookies.getCookie("Access-Token")).toBe(null)
})

it('Sessions: setUser fails when uid is missing ', () => {
  const data = { "access-token": "67890" }
  Sessions.setUser(data)
  expect(Cookies.getCookie("Access-Token")).toBe(null)
})

it('Sessions: setUser works when data is provided', () => {
  const data = { "access-token": "12345", "uid": "67890" }
  Sessions.setUser(data)
  expect(Cookies.getCookie("Access-Token")).toBe("12345")
})

it('Sessions: clearUser functionality', () => {
  const data = { "access-token": "12345", "uid": "67890" }
  Sessions.setUser(data)
  expect(Cookies.getCookie("Access-Token")).toBe("12345")
  Sessions.clearUser()
  expect(Cookies.getCookie("Access-Token")).toBe(null)
})

it('Sessions: ')