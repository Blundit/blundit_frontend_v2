class URL {
  static pathParam = (param, def) => {
    const url = window.location.href
    const name = param.replace(/[\[\]]/g, "\\$&")
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
    const results = regex.exec(url)
  
    if (!results) {
      return def
    }

    if (!results[2]) {
      return def
    }
  
    return decodeURIComponent(results[2].replace(/\+/g, " "))
  }
}

export default URL