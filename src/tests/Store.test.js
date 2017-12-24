import Store from './../Store';

it('Store: default user store', () => {
  expect(Store.getState().user).toBe(null);
});

it('Store: log in user with no info', () => {
  Store.dispatch({
    type: "USER_LOGIN",
    value: null
  })

  expect(Store.getState().user).toBe(null);
})

it('Store: log in user', () => {
  Store.dispatch({
    type: "USER_LOGIN",
    value: { user: "test", id: 1 }
  })

  expect(Store.getState().user.user).toBe("test")
  expect(Store.getState().user.id).toBe(1)
})

it('Store: update user', () => {
  Store.dispatch({
    type: "USER_EDIT",
    value: { user: "test_edited" }
  })

  expect(Store.getState().user.user).toBe("test_edited");
  expect(Store.getState().user.id).toBe(1)
})

it('Store: require user object for update', () => {
  Store.dispatch({
    type: "USER_EDIT",
    value: "bob"
  })

  expect(Store.getState().user).not.toBe("bob");
})

