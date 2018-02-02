import Icons from './../../utilities/Icons'

it('Icons: it exists', () => {
  expect(typeof(Icons)).toEqual("function")
})

it('Icons: return class if valid', () => {
  const icon_string = "testing";
  const icon = Icons.get(icon_string)

  expect(icon).toBe("fas fa-home")
})

it('Icons: default class if empty string passed', () => {
  const icon_string = "";
  const icon = Icons.get(icon_string)

  expect(icon).toBe("fas fa-question")
})

it('Icons: default class if null passed', () => {
  const icon = Icons.get()

  expect(icon).toBe("fas fa-question")
})

