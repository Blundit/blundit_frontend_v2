const ids = {
  "category_testing": "fa-home",
  "category_5": "fa-camera-retro",
  "category_34": "fa-home"
}


class Icons {
  static get(id) {
    if (!id) return "fas fa-question";

    if (ids[id]) return "fas " + ids[id]

    return "fas fa-question"
  }
}

export default Icons;