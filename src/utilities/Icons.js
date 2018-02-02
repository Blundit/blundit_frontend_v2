const ids = {
  "category_testing": "fa-home",
  "category_1": "fas fa-flask",
  "category_5": "fa-camera-retro",
  "category_34": "fa-home"
}


class Icons {
  static get(id) {
    if (!id) return "fas fa-question";

    if (ids["category_"+id]) return "fas " + ids["category_"+id]

    return "fas fa-question"
  }
}

export default Icons;