import Cache from './../../utilities/Cache'

it('Cache: it exists', () => {
  expect(typeof(Cache)).toEqual("function")
})


it('Cache: Gets object index with only default params (page 1, no search or sort or date)', () => {
  const state = [
    { key: '', type: '', page: 1, search: '', sort: '', created: Date.now(), items: [] },
    { key: '', type: '', page: 2, search: '', sort: '', created: Date.now(), items: [] },
    { key: '', type: '', page: 3, search: '', sort: '', created: Date.now(), items: [] },
  ]

  let present = Cache.present(state)
  expect(present).toBe(0)
})

it('Cache: Gets object index with params (page 2, no search or sort or date)', () => {
  const state = [
    { key: '', type: '', page: 1, search: '', sort: '', created: Date.now(), items: [] },
    { key: 'claims_list', type: 'claim', page: 2, search: '', sort: '', created: Date.now(), items: [] },
    { key: '', type: '', page: 3, search: '', sort: '', created: Date.now(), items: [] },
  ]

  let present = Cache.present(state, { key: 'claims_list', type: 'claim', page: 2, search: '', sort: '' })
  expect(present).toBe(1)
})

it('Cache: Checks if key is valid, using default params (page 1, no search or sort, but with date)', () => {
  const state = [
    { key: '', type: '', page: 1, search: '', sort: '', created: Date.now(), items: [] },
    { key: '', type: '', page: 2, search: '', sort: '', created: Date.now(), items: [] },
    { key: '', type: '', page: 3, search: '', sort: '', created: Date.now(), items: [] },
  ]

  let valid = Cache.valid(state)
  expect(valid).toBe(true)
})

it('Cache: Checks if key is valid, using params (page 2, no search or sort, but with date)', () => {
  const state = [
    { key: '', type: '', page: 1, search: '', sort: '', created: 1514592000000, items: [] },
    { key: 'claims_list', type: 'claim', page: 2, search: '', sort: '', created: Date.now(), items: [] },
    { key: '', type: '', page: 3, search: '', sort: '', created: Date.now(), items: [] },
  ]

  let valid = Cache.valid(state, { key: 'claims_list', type: 'claim', page: 2, search: '', sort: '', created: Date.now() })
  expect(valid).toBe(true)
})

it('Cache: Finds invalid/expired keys, with default params (page 1, no search or sort, with Date.now()', () => {
  const state = [
    { key: '', type: '', page: 1, search: '', sort: '', created: 1514592000000, items: [] },
    { key: '', type: '', page: 2, search: '', sort: '', created: Date.now(), items: [] },
    { key: '', type: '', page: 3, search: '', sort: '', created: Date.now(), items: [] },
  ]

  let invalid = Cache.invalid(state)
  expect(invalid).toBe(true)
})

it('Cache: Finds invalid/expired keys, with params (page 2, no search or sort, with date of 1 minute ago', () => {
  const state = [
    { key: '', type: '', page: 1, search: '', sort: '', created: Date.now() - 121000, items: [] },
    { key: '', type: '', page: 2, search: '', sort: '', created: Date.now(), items: [] },
    { key: '', type: '', page: 3, search: '', sort: '', created: Date.now(), items: [] },
  ]

  let invalid = Cache.invalid(state)
  expect(invalid).toBe(true)
})

it('Cache: Prunes expired keys', () => {
  const state = [
    { key: '', type: '', page: 1, search: '', sort: '', created: Date.now() - 121000, items: [] },
    { key: '', type: '', page: 2, search: '', sort: '', created: Date.now() - 321000, items: [] },
    { key: '', type: '', page: 3, search: '', sort: '', created: Date.now(), items: [] },
    { key: '', type: '', page: 4, search: '', sort: '', created: Date.now() - 1231000, items: [] },
    { key: '', type: '', page: 5, search: '', sort: '', created: Date.now() - 20000, items: [] },
    { key: '', type: '', page: 6, search: '', sort: '', created: Date.now() - 1000000, items: [] },
  ]

  let pruned = Cache.prune(state)
  expect(pruned.length).toBe(2)
  expect(pruned[0].page).toBe(3)
  expect(pruned[1].page).toBe(5)
})

it('Cache: Return items array, with default params (page 1, no search or sort', () => {
  const state = [
    { key: '', type: '', page: 1, search: '', sort: '', created: Date.now() - 119, items: [0,1,2] },
    { key: '', type: '', page: 2, search: '', sort: '', created: Date.now(), items: [] },
    { key: '', type: '', page: 3, search: '', sort: '', created: Date.now(), items: [] },
  ]

  let items = Cache.items(state)
  expect(items).not.toBe(null)
  expect(items.length).toBe(3)
  expect(items[1]).toBe(1)
})

it('Cache: Return items array, with custom params (page 2, no search or sort', () => {
  const state = [
    { page: 1, search: '', sort: '', created: Date.now() - 119, items: [0,1,2] },
    { page: 2, search: '', sort: '', created: Date.now(), items: [2,"Watermelon"] },
    { page: 3, search: '', sort: '', created: Date.now(), items: [] },
  ]

  let items = Cache.items(state, { page: 2, search: '', sort: '' })
  expect(items).not.toBe(null)
  expect(items.length).toBe(2)
  expect(items[1]).toBe("Watermelon")
})

it('Cache: Shouldnt return items array for expired cache key', () => {
  const state = [
    { page: 1, search: '', sort: '', created: Date.now() - 121000, items: [0,1,2] },
    { page: 2, search: '', sort: '', created: Date.now(), items: [2,"Watermelon"] },
    { page: 3, search: '', sort: '', created: Date.now(), items: [] },
  ]

  let items = Cache.items(state, { page: 1, search: '', sort: '' })
  expect(items).toBe(undefined)
})