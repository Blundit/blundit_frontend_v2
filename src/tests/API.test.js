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

it('API: fetch will return something', () => {
  let params = {
    path: "login",
    data: {
      email: "brian@hoggworks.com",
      password: "password"
    }
  }

  let dummyData = {"data": {"avatar_content_type": "image/jpeg", "avatar_file_name": "IMG_3771.JPG", "avatar_file_size": 1943474, "avatar_updated_at": "2017-04-19T18:03:42.000Z", "claims_added": 0, "comments_count": 12, "email": "brian@hoggworks.com", "experts_added": 0, "first_name": "Brian", "id": 3, "last_name": "Hogg", "name": "Brian Hogg", "nickname": null, "notification_frequency": "as_they_happen", "predictions_added": 0, "provider": "email", "uid": "brian@hoggworks.com", "user_comments_count": 12, "votes_count": 4}}
  let myMock = jest.fn();
  
  myMock.mockReturnValueOnce(dummyData);

  expect.assertions(1);
  expect(myMock()).toEqual(dummyData);
})

it('API: Login will return headers')
it('API: Register will return headers')