import API from '../utilities/API'

it('API: exists', () => {
  expect(typeof(API)).toEqual("function")
})

it('API: server method blocks empty requests', () => {
  let response = { errors: ["params_missing"]}
  expect(API.server()).toEqual(response)
})

it('API: server method requires path in params object', () => {
  let params = {}
  let response = { errors: ["valid_param_path_required"] }

  expect(API.server(params)).toEqual(response);
})

it('API: server method requires existing path in params object', () => {
  let params = { path: "blah" }
  let response = { errors: ["params_path_not_found_in_list"] }
  expect(API.server(params)).toEqual(response);
})

it('API: returns valid server with valid param', () => {
  let params = { path: "login" }
  expect(typeof(API.server(params))).toBe("string")
})

it('API: with valid param and path returns method', () => {
  let params = { path: "login" }
  let response = "POST";
  expect(API.method(params)).toBe(response);
})

it('API: path without method set returns error', () => {
  let params = { path: "missing_method" }
  let response = { errors: ["param_method_not_set_in_api"] }

  expect(API.method(params)).toEqual(response);
})

it('API: updates path with path_variables', () => {
  let params = {
    path: "remove_bookmark",
    path_variables: {
      bookmark_id: 4
    }
  }

  let response = "/remove_bookmark/4"
  expect(API.path(params)).toContain(response)

})

it('API: appends GET variables', () => {
  let params = {
    path: "category_predictions",
    path_variables: {
      category_id: 4
    },
    data: {
      one: "one",
      two: "two"
    }
  }

  let response = "?one=one&two=two"
  expect(API.path(params)).toContain(response)
})

it('API: data returns empty object if no params data is passed', () => {
  let params = {};
  let response = {};

  expect(API.data(params)).toEqual(response)
})

it('API: data returns unchanged data if params data is sent', () => {
  let data = { one: "one", two: "two" };
  let params = { data: data};
  let response = data;

  expect(API.data(params)).toEqual(response)
})

it('API: do method returns error if path is empty', () => {
  let params = {};
  let response = { errors: ["valid_param_path_required"] };
  expect(API.do(params)).toEqual(response);
})

it('API: do method returns error if path is invalid', () => {
  let params = { path: "tripwire" };
  let response = { errors: ["params_path_not_found_in_list"] };
  expect(API.do(params)).toEqual(response);
})

