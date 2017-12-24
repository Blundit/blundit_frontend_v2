import Cookies from './Cookies';
/*
API Class.
Usage to call is like this:
path is required.
path_variables is optional, and used for replacement in paths, like 'claims/%claim_id%/add_commment'
data is optional.

params = {
  path: "claims"
  path_variables:
    claim_id: 1
  data:
    id: "xxx"
  success: @function
  error: @function
}
API.do(params)
 */

class API {
  static paths = (path) => {
    const p = {
      register: {
        path: "auth/",
        non_api: true,
        method: "POST"
      },
      login: {
        path: "auth/sign_in",
        non_api: true,
        method: "POST"
      },
      logout: {
        path: "auth/sign_out",
        non_api: true,
        method: "DELETE"
      },
      forgot_password: {
        path: "auth/password",
        non_api: true,
        method: "POST"
      },
      categories: {
        path: "categories",
        method: "GET"
      },
      category: {
        path: "categories/%category_id%",
        method: "GET"
      },
      category_predictions: {
        path: "categories/%category_id%/predictions",
        method: "GET"
      },
      category_claims: {
        path: "categories/%category_id%/claims",
        method: "GET"
      },
      category_experts: {
        path: "categories/%category_id%/experts",
        method: "GET"
      },
      category_all: {
        path: "categories/%category_id%/all",
        method: "GET"
      },
      claims: {
        path: "claims",
        method: "GET"
      },
      all_claims: {
        path: "claims/all",
        method: "GET"
      },
      claim: {
        path: "claims/%claim_id%",
        method: "GET"
      },
      create_claim: {
        path: "claims/",
        method: "POST"
      },
      claim_add_comment: {
        path: "claims/%claim_id%/add_comment",
        method: "POST"
      },
      vote_for_claim: {
        path: "claims/%claim_id%/vote",
        method: "POST"
      },
      predictions: {
        path: "predictions",
        method: "GET"
      },
      all_predictions: {
        path: "predictions/all",
        method: "GET"
      },
      prediction: {
        path: "predictions/%prediction_id%",
        method: "GET"
      },
      add_evidence_to_prediction: {
        path: "predictions/%prediction_id%/add_evidence",
        method: "POST"
      },
      add_evidence_to_claim: {
        path: "claims/%claim_id%/add_evidence",
        method: "POST"
      },
      create_prediction: {
        path: "predictions/",
        method: "POST"
      },
      prediction_add_comment: {
        path: "predictions/%prediction_id%/add_comment",
        method: "POST"
      },
      vote_for_prediction: {
        path: "predictions/%prediction_id%/vote",
        method: "POST"
      },
      experts: {
        path: "experts",
        method: "GET"
      },
      all_experts: {
        path: "experts/all",
        method: "GET"
      },
      expert: {
        path: "experts/%expert_id%",
        method: "GET"
      },
      create_expert: {
        path: "experts/",
        method: "POST"
      },
      expert_add_comment: {
        path: "experts/%expert_id%/add_comment",
        method: "POST"
      },
      add_prediction_to_expert: {
        path: "experts/%expert_id%/add_prediction",
        method: "POST"
      },
      add_claim_to_expert: {
        path: "experts/%expert_id%/add_claim",
        method: "POST"
      },
      add_expert_to_prediction: {
        path: "predictions/%prediction_id%/add_expert",
        method: "POST"
      },
      add_expert_to_claim: {
        path: "claims/%claim_id%/add_expert",
        method: "POST"
      },
      get_substantiations: {
        path: "experts/%expert_id%/get_substantiations",
        method: "POST"
      },
      add_substantiation: {
        path: "experts/%expert_id%/add_substantiation",
        method: "POST"
      },
      add_bona_fide: {
        path: "experts/%expert_id%/add_bona_fide",
        method: "POST"
      },
      update_expert_image: {
        path: "experts/%expert_id%/update_image",
        file: true,
        method: "PATCH"
      },
      delete_expert_image: {
        path: "experts/%expert_id%/delete_image",
        method: "DELETE"
      },
      update_claim_image: {
        path: "claims/%claim_id%/update_image",
        file: true,
        method: "PATCH"
      },
      delete_claim_image: {
        path: "claims/%claim_id%/delete_image",
        method: "DELETE"
      },
      update_prediction_image: {
        path: "predictions/%prediction_id%/update_image",
        file: true,
        method: "PATCH"
      },
      delete_prediction_image: {
        path: "predictions/%prediction_id%/delete_image",
        method: "DELETE"
      },
      bookmarks: {
        path: "user/bookmarks",
        method: "GET"
      },
      verify_token: {
        path: "auth/validate_token?access-token=%accessToken%&client=%client%&uid=%uid%&",
        method: "GET",
        non_api: true
      },
      expert_comments: {
        path: "experts/%expert_id%/comments",
        method: "GET"
      },
      claim_comments: {
        path: "claims/%claim_id%/comments",
        method: "GET"
      },
      prediction_comments: {
        path: "predictions/%prediction_id%/comments",
        method: "GET"
      },
      update_bookmark: {
        path: "user/update_bookmark/%bookmark_id%",
        method: "POST"
      },
      remove_bookmark: {
        path: "user/remove_bookmark/%bookmark_id%",
        method: "POST"
      },
      add_bookmark: {
        path: "user/add_bookmark",
        method: "POST"
      },
      homepage: {
        path: "home/homepage",
        method: "GET"
      },
      search: {
        path: "search",
        method: "POST"
      },
      update_user: {
        path: "user/update",
        file: true,
        method: "PUT"
      },
      get_avatar: {
        path: "user/get_avatar",
        method: "POST"
      },
      missing_method: {
        path: "!!!"
      }
    };

    if (path && p[path]) {
      return p[path];
    } else {
      return null;
    }
  }

  static validatePath(params) {
    let errors = [];

    if (!params || typeof(params) != "object") errors.push("params_missing");
    if (params && (!params.path || params.path.trim() == "")) errors.push("valid_param_path_required");
    if (params && params.path && !this.paths(params.path)) errors.push("params_path_not_found_in_list")

    if (errors.length > 0) return { errors: errors }
    return true;
  }
  

  static server (params) {
    let validPath = this.validatePath(params);
    if (validPath != true) return validPath;

    this.s = this.serverBase();
    if ((this.paths(params.path).non_api != null) && this.paths(params.path).non_api === true) {
      return this.s;
    }

    return this.s + "/api/v1/";
  }


  static serverBase () {
    this.s = "http://localhost:5000/";
    if (window.location.href.indexOf("localhost", 0) === -1) {
      this.s = "https://fast-earth-30912.herokuapp.com/";
    }

    return this.s;
  }


  static method (params) {
    if (!this.paths(params.path).method) {
      return { errors: ["param_method_not_set_in_api"] }
    }

    return this.paths(params.path).method;
  }


  static path (params) {
    let p = this.server(params) + this.paths(params.path).path;
    let ref = params.path_variables;

    for (let key in ref) {
      let value = ref[key];
      p = p.replace('%' + key + '%', value);
    }

    if (this.paths(params.path).method === "GET") {
      p = p + this.dataAsGet(params.data);
    }
    
    return p;
  }


  static dataAsGet (data) {
    let d = "?";

    for (let key in data) {
      let value = data[key];
      d += key + "=" + (encodeURIComponent(value)) + "&";
    }

    return d;
  }


  static data (params) {
    let data;

    if (params.data != null) {
      data = params.data;
    } else {
      data = {};
    }

    return data;
  }


  static processData (params) {
    if (params.path === "update_user") {
      return false;
    } else {
      return "";
    }
  }


  static contentType (params) {
    if (params.path === "update_user") {
      return false;
    } else {
      return "";
    }
  }

  static do (params) {
    // TODO: Convert to promises
    // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
    
    let validPath = this.validatePath(params);
    if (validPath != true) return validPath;
    
    let formData = new FormData();
    for (let prop in params.data) {
      formData.append(prop, params.data[prop]);
    }

    let config = { 
      method: this.method(params),
      mode: 'no-cors',
      cache: 'default',
      body: formData
    };

    let xhr = new XMLHttpRequest();
    xhr.open(this.method(params), this.path(params), true);

    if (Cookies.getCookie("auth_token")) {
      xhr.setRequestHeader("Authorization", "Token " + Cookies.getCookie("auth_token"));
    }

    xhr.responseType = 'json';
    xhr.onload = () => {
      let response = xhr.response;
      let header = null;
      if (xhr.status.toString().indexOf("2", 0) == 0) {
        params.success(response, xhr.getAllResponseHeaders());
      } else {
        params.error(response);
      }
    }

    xhr.onerror = () => {
      params.error(xhr.statusText)
    }
    xhr.send(formData);
  }
 
}

export default API;