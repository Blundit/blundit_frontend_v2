import Cookies from './Cookies';

class Sessions {
  static setUser (data) {
    if (data && data["access-token"] != null && data["uid"] != null) {
      Cookies.setCookie('Access-Token', data["access-token"]);
      Cookies.setCookie('Uid', data["uid"]);
    } else {
      return { error: "user_data_missing" }
    }

    // return true
  }

  static clearUser () {
    Cookies.deleteCookie('Access-Token');
    Cookies.deleteCookie('Uid');

    // TODO: Wipe out user object here
    
  }


  // getURLParameter (name, url) {
  //   let regex, results;
  //   if (!url) {
  //     url = window.location.href;
  //   }
  //   name = name.replace(/[\[\]]/g, "\\$&");
  //   regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  //   results = regex.exec(url);
  //   if (!results) {
  //     return null;
  //   }
  //   if (!results[2]) {
  //     return '';
  //   }
  //   return decodeURIComponent(results[2].replace(/\+/g, " "));
  // }


  // verifyUserToken () {
  //   // TODO: MAKE THIS A PROMISE
  //   if (window.global.getCookie('Access-Token')) {
  //     return this.verifyToken();
  //   } else {
  //     return this.setState({
  //       verificationComplete: true
  //     });
  //   }
  // }


  // verifyToken () {
  //   let params = {
  //     path: "verify_token",
  //     path_variables: {
  //       accessToken: window.global.getCookie('Access-Token'),
  //       client: window.global.getCookie('Client'),
  //       uid: encodeURIComponent(window.global.getCookie('Uid'))
  //     },
  //     success: this.verifyTokenSuccess,
  //     error: this.verifyTokenError
  //   };
  //   API.c(params)
  // }


  // verifyTokenSuccess (data) {
  //   if (data.data) {
  //     data.data.token = window.global.getCookie('Access-Token');
  //     data.data.client = window.global.getCookie('Client');
  //     data.data.uid = window.global.getCookie('Uid');
  //     this.setUser(data.data);
  //     return UserStore.getUserAvatar();
  //   }
  // }


  // verifyTokenError (error) {
  //   return this.setUser({});
  // }
};

export default Sessions;