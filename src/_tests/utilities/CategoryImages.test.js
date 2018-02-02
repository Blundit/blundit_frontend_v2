import CategoryImages from './../../utilities/CategoryImages'

it('CategoryImages: it exists', () => {
  expect(typeof(CategoryImages)).toEqual("function")
})

it('CategoryImages: return class if valid', () => {
  const img_string = "testing";
  const img = CategoryImages.get(img_string)

  expect(img).toBe("url(/images/categories/testing.jpg)")
})

it('CategoryImages: default class if empty string passed', () => {
  const img_string = "";
  const img = CategoryImages.get(img_string)

  expect(img).toBe("none")
})

it('CategoryImages: default class if null passed', () => {
  const img = CategoryImages.get()

  expect(img).toBe("none")
})

