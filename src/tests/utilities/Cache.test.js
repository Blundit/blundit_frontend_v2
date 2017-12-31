import Cache from './../../utilities/Cache'

it('Cache: it exists', () => {
  expect(typeof(Cache)).toEqual("function")
})


it('Cache: Gets object index with only default params (page 1, no search or sort or date)', () => {
  const state = [
    { page: 1, search: '', sort: '', created: Date.now(), data: [] },
    { page: 2, search: '', sort: '', created: Date.now(), data: [] },
    { page: 3, search: '', sort: '', created: Date.now(), data: [] },
  ]

  let present = Cache.present(state)
  expect(present).toBe(0)
})

it('Cache: Gets object index with params (page 2, no search or sort or date)', () => {
  const state = [
    { page: 1, search: '', sort: '', created: Date.now(), data: [] },
    { page: 2, search: '', sort: '', created: Date.now(), data: [] },
    { page: 3, search: '', sort: '', created: Date.now(), data: [] },
  ]

  let present = Cache.present(state, { page: 2, search: '', sort: '' })
  expect(present).toBe(1)
})

it('Cache: Checks if key is valid, using default params (page 1, no search or sort, but with date)', () => {
  const state = [
    { page: 1, search: '', sort: '', created: Date.now(), data: [] },
    { page: 2, search: '', sort: '', created: Date.now(), data: [] },
    { page: 3, search: '', sort: '', created: Date.now(), data: [] },
  ]

  let valid = Cache.valid(state)
  expect(valid).toBe(true)
})

it('Cache: Checks if key is valid, using params (page 2, no search or sort, but with date)', () => {
  const state = [
    { page: 1, search: '', sort: '', created: 1514592000000, data: [] },
    { page: 2, search: '', sort: '', created: Date.now(), data: [] },
    { page: 3, search: '', sort: '', created: Date.now(), data: [] },
  ]

  let valid = Cache.valid(state, { page: 2, search: '', sort: '', created: Date.now() })
  expect(valid).toBe(true)
})

it('Cache: Finds invalid/expired keys, with default params (page 1, no search or sort, with Date.now()', () => {
  const state = [
    { page: 1, search: '', sort: '', created: 1514592000000, data: [] },
    { page: 2, search: '', sort: '', created: Date.now(), data: [] },
    { page: 3, search: '', sort: '', created: Date.now(), data: [] },
  ]

  let invalid = Cache.invalid(state)
  expect(invalid).toBe(true)
})

it('Cache: Finds invalid/expired keys, with params (page 2, no search or sort, with date of 1 minute ago', () => {
  const state = [
    { page: 1, search: '', sort: '', created: Date.now() - 121, data: [] },
    { page: 2, search: '', sort: '', created: Date.now(), data: [] },
    { page: 3, search: '', sort: '', created: Date.now(), data: [] },
  ]

  let invalid = Cache.invalid(state)
  expect(invalid).toBe(true)
})

it('Cache: Prunes expired keys', () => {
  const state = [
    { page: 1, search: '', sort: '', created: Date.now() - 121, data: [] },
    { page: 2, search: '', sort: '', created: Date.now() - 321, data: [] },
    { page: 3, search: '', sort: '', created: Date.now(), data: [] },
    { page: 4, search: '', sort: '', created: Date.now() - 1231, data: [] },
    { page: 5, search: '', sort: '', created: Date.now() - 20, data: [] },
    { page: 6, search: '', sort: '', created: Date.now() - 1000, data: [] },
  ]

  let pruned = Cache.prune(state)
  expect(pruned.length).toBe(2)
  expect(pruned[0].page).toBe(3)
  expect(pruned[1].page).toBe(5)
})