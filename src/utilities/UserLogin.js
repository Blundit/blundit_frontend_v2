import Sessions from './Sessions'
import API from './API'
// TODO: Find a way for this to accept state, or put userlogin somewhere else.
export const UserLogin = (email, password, success = null, error = null) => {
  let errors = [];
  if (email) email = email.trim()
  if (password) password = password.trim()
  if (!email || email.length < 1) errors.push("email_required");
  if (!password || password.length < 1) errors.push("password_required");

  if (errors.length > 0) return { errors: errors }

  let params = {
    path: "login",
    data: { email: email, password: password },
    success: success,
    error: error
  }
  return API.do(params).then(function(result) {
    if (result.error == true) {
      return result
    } else {

    }

  }, 
  function (reject) {
    
  })
}

export const UserLogout = (token, success = null, error = null) => {
  if (!token) {
    return { errors: ["user_token_required"] }
  }

  let params = { path: "logout" }
  return API.do(params).then(function(result) {
    Sessions.clearUser()
  }, 
  function(error) {
    console.log(error)
  });
}