export const UserLogin = (username, password) => {
  let errors = [];
  if (username) username = username.trim()
  if (password) password = password.trim()
  if (!username || password.length < 1) errors.push("username_required");
  if (!password || password.length < 1) errors.push("password_required");

  if (errors.length > 0) return { errors: errors }

  
}

export const UserLogout = (token) => {
  if (!token) {
    return { errors: ["user_token_required"] }
  }
}