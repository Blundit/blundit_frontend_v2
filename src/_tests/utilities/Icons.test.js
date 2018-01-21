import Icons from './../../utilities/Icons'

it('Icons: it exists', () => {
  expect(typeof(Icons)).toEqual("function")
})

it('Icons: return class if valid', () => {
  const icon_string = "category_testing";
  const icon = Icons.get(icon_string)

  expect(icon).toBe("fas fa-home")
})

it('Icons: empty string if empty string passed', () => {
  const icon_string = "";
  const icon = Icons.get(icon_string)

  expect(icon).toBe("")
})

it('Icons: empty string if null passed', () => {
  const icon = Icons.get()

  expect(icon).toBe("")
})

