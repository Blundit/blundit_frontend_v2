const default_ttl = 120000 // seconds

/*
  Usage: 
  componentDidMount () {
    if (Cache.invalid(state.claims, { search: '', page: 1 }, ttl)) {
      // item isn't cached: send request to server
    }
  }

  // usage in component, for displaying purposes
  let claim_list = Cache.items(claims, {page: current_page, search: current_search, sort: current_sort, created: Date.now() }
  claim_list.forEach((claim) => 
    
)
  TTL overrides default_ttl, which is the lifespan of the cache key, in seconds
*/

class Cache {
  static present(state = [], new_item = { type: '', key: '', search: '', page: 1, created: Date.now(), sort: '' }, ttl = default_ttl) {
    let index = state.findIndex((element) => (
      element.page === new_item.page 
      && element.sort === new_item.sort
      && element.search === new_item.search
    ))

    if (index > -1) return index
  }


  static valid(state = [], new_item = { type: '', key: '', search: '', page: 1, created: Date.now(), sort: '' }, ttl = default_ttl) {
    if (!state) return false

    let item = state.find((element) => (
      element.page === new_item.page 
      && element.search === new_item.search
      && element.sort === new_item.sort
      && element.type === new_item.type
      && element.key === new_item.key
      && Math.abs(new_item.created - element.created) <= ttl
    ))

    if (item) return true
  }


  static invalid(state = [], new_item = { type: '', key: '', search: '', page: 1, created: Date.now(), sort: '', status: 0 }, ttl = default_ttl) {
    if (!state) return true

    let item = state.find((element) => (
      element.page === new_item.page 
      && element.search === new_item.search
      && element.sort === new_item.sort
      && element.type === new_item.type
      && element.key === new_item.key
      && element.status === new_item.status
    ))

    if (!item) return true

    item = state.find((element) => (
      element.page === new_item.page 
      && element.search === new_item.search
      && element.sort === new_item.sort
      && element.type === new_item.type
      && element.key === new_item.key
      && element.status === new_item.status
      && Math.abs(new_item.created - element.created) > ttl
    ))

    if (item) return true
  }


  static items(state, params = { key: '', type: '', search: '', page: 1, status: 0, sort: ''}, ttl = default_ttl) {
    if (!state) return undefined
    let item = state.find((element) => {
      return element.page === params.page 
      && element.search === params.search
      && element.sort === params.sort
      && element.type === params.type
      && element.key === params.key
      && element.status === params.status
      && Math.abs(Date.now() - element.created) <= ttl
    })

    if (item) return item.items
  }


  static prune(state, ttl = default_ttl) {
    return state.filter((element) => (
      Math.abs(Date.now() - element.created) <= ttl
    ))
  }
}

export default Cache;