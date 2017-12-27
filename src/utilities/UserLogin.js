export const UserLogin = (username, password, success = null, error = null) => {
  let errors = [];
  if (username) username = username.trim()
  if (password) password = password.trim()
  if (!username || password.length < 1) errors.push("username_required");
  if (!password || password.length < 1) errors.push("password_required");

  if (errors.length > 0) return { errors: errors }

  let params = {
    path: "login",
    data: { username: username, password: password },
    success: success,
    error: error
  }
  return API.do(params).then(function(resolve, reject) {
    // set user 
    // TODO: add user with new info to state
    
  })
}

export const UserLogout = (token, success = null, error = null) => {
  if (!token) {
    return { errors: ["user_token_required"] }
  }

  let params = { path: "logout" }
  return API.do(params).then(function(resolve, reject) {
    // something goes here
    // TODO: Clear out the state
  })
}