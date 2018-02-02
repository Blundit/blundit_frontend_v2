const ids = {
  "category_testing": "fa-home",
  "category_1": "fas fa-flask",
  "category_2": "fas fa-flask",
  "category_3": "fas fa-flask",
  "category_4": "fas fa-flask",
  "category_5": "fas fa-eye",
  "category_6": "fas fa-flask",
  "category_7": "fas fa-flask",
  "category_8": "fas fa-flask",
  "category_9": "fas fa-flask",
  "category_10": "fas fa-flask",
  "category_11": "fas fa-flask",
  "category_12": "fas fa-flask",
  "category_13": "fas fa-flask",
  "category_14": "fas fa-flask",
  "category_15": "fas fa-eye",
  "category_16": "fas fa-flask",
  "category_17": "fas fa-flask",
  "category_18": "fas fa-flask",
  "category_19": "fas fa-flask",
  "category_20": "fas fa-flask",
  "category_21": "fas fa-flask",
  "category_22": "fas fa-flask",
  "category_23": "fas fa-flask",
  "category_24": "fas fa-flask",
  "category_25": "fas fa-eye",
  "category_26": "fas fa-flask",
  "category_27": "fas fa-flask",
  "category_28": "fas fa-flask",
  "category_29": "fas fa-flask",
  "category_30": "fas fa-flask",
  "category_31": "fas fa-flask",
  "category_32": "fas fa-flask",
  "category_33": "fas fa-flask",
  "category_34": "fa-balance-scale",
  "category_35": "fas fa-eye",
  "category_36": "fas fa-flask",
  "category_37": "fas fa-flask",
  "category_38": "fas fa-flask",
  "category_39": "fas fa-flask",
  "category_40": "fas fa-flask",
  "category_41": "fas fa-flask",
  "category_42": "fas fa-flask",
  "category_43": "fas fa-flask",
  "category_44": "fas fa-flask",
  "category_45": "fas fa-eye",
  "category_46": "fas fa-flask",
  "category_47": "fas fa-flask",
  "category_48": "fas fa-flask",
  "category_49": "fas fa-flask",
  "category_50": "fas fa-flask",
  "category_51": "fas fa-flask",
  "category_52": "fas fa-flask",
  "category_53": "fas fa-flask",
  "category_54": "fas fa-flask",
  
}


class Icons {
  static get(id) {
    if (!id) return "fas fa-question";

    if (ids["category_"+id]) return "fas " + ids["category_"+id]

    return "fas fa-question"
  }
}

export default Icons;