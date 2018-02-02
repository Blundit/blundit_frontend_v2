const ids = {
  "category_testing": "url(/images/categories/testing.jpg)",
  "category_1": "url(/images/categories/1.jpg)",
  "category_2": "url(/images/categories/2.jpg)",
  "category_3": "url(/images/categories/3.jpg)",
  "category_4": "url(/images/categories/4.jpg)",
  "category_5": "url(/images/categories/5.jpg)",
  "category_6": "url(/images/categories/6.jpg)",
  "category_7": "url(/images/categories/7.jpg)",
  "category_8": "url(/images/categories/8.jpg)",
  "category_9": "url(/images/categories/9.jpg)",
  "category_10": "url(/images/categories/10.jpg)",
  "category_11": "url(/images/categories/11.jpg)",
  "category_12": "url(/images/categories/12.jpg)",
  "category_13": "url(/images/categories/13.jpg)",
  "category_14": "url(/images/categories/14.jpg)",
  "category_15": "url(/images/categories/15.jpg)",
  "category_16": "url(/images/categories/16.jpg)",
  "category_17": "url(/images/categories/17.jpg)",
  "category_18": "url(/images/categories/18.jpg)",
  "category_19": "url(/images/categories/19.jpg)",
  "category_20": "url(/images/categories/20.jpg)",
  "category_21": "url(/images/categories/21.jpg)",
  "category_22": "url(/images/categories/22.jpg)",
  "category_23": "url(/images/categories/23.jpg)",
  "category_24": "url(/images/categories/24.jpg)",
  "category_25": "url(/images/categories/25.jpg)",
  "category_26": "url(/images/categories/26.jpg)",
  "category_27": "url(/images/categories/27.jpg)",
  "category_28": "url(/images/categories/28.jpg)",
  "category_29": "url(/images/categories/29.jpg)",
  "category_30": "url(/images/categories/30.jpg)",
  "category_31": "url(/images/categories/31.jpg)",
  "category_32": "url(/images/categories/32.jpg)",
  "category_33": "url(/images/categories/33.jpg)",
  "category_34": "url(/images/categories/34.jpg)",
  "category_35": "url(/images/categories/35.jpg)",
  "category_36": "url(/images/categories/36.jpg)",
  "category_37": "url(/images/categories/37.jpg)",
  "category_38": "url(/images/categories/38.jpg)",
  "category_39": "url(/images/categories/39.jpg)",
  "category_40": "url(/images/categories/40.jpg)",
  "category_41": "url(/images/categories/41.jpg)",
  "category_42": "url(/images/categories/42.jpg)",
  "category_43": "url(/images/categories/43.jpg)",
  "category_44": "url(/images/categories/44.jpg)",
  "category_45": "url(/images/categories/45.jpg)",
  "category_46": "url(/images/categories/46.jpg)",
  "category_47": "url(/images/categories/47.jpg)",
  "category_48": "url(/images/categories/48.jpg)",
  "category_49": "url(/images/categories/49.jpg)",
  "category_50": "url(/images/categories/50.jpg)",
  "category_51": "url(/images/categories/51.jpg)",
  "category_52": "url(/images/categories/52.jpg)",
  "category_53": "url(/images/categories/53.jpg)",
  "category_54": "url(/images/categories/54.jpg)",
  
}


class CategoryImages {
  static get(id) {
    if (!id) return "none";

    if (ids["category_"+id]) return ids["category_"+id]

    return "none"
  }
}

export default CategoryImages