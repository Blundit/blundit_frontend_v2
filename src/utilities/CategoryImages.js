const ids = {
  "category_testing": "url(/images/categories/testing.jpg)",
  "category_1": "url(/images/categories/1.jpg)",
  "category_5": "url(/images/categories/5.jpg)",
  "category_34": "url(/images/categories/34.jpg)"
}


class CategoryImages {
  static get(id) {
    if (!id) return "none";

    if (ids["category_"+id]) return ids["category_"+id]

    return "none"
  }
}

export default CategoryImages