import Cookies from './../utilities/Cookies';

it('Cookies: test setCookie functionality', () => {
  let setCookie = Cookies.setCookie("test", "tester")
  let response = "test=tester; path=/"
  expect(setCookie).toBe(response)
})

it('Cookies: test getCookie functionality', () => {
  Cookies.setCookie("test", "tester")
  let getCookie = Cookies.getCookie("test")
  let response = "tester"

  expect(getCookie).toBe(response);
})

it('Cookies: test deleteCookie functionality', () => {
  Cookies.setCookie("test", "tester")
  let getCookie = Cookies.getCookie("test")
  Cookies.deleteCookie("test")
  let getDeletedCookie = Cookies.getCookie("test")

  expect(getDeletedCookie).toBe(null);
})