import Cookies from './Cookies';
import API from './API';

class Sessions {
  static setUser (data) {
    if (data && data["access-token"] !== null && data["uid"] !== null) {
      Cookies.setCookie('Access-Token', data["access-token"])
      Cookies.setCookie('Uid', data["uid"])
      Cookies.setCookie('Client', data["client"])
    } else {
      return { error: "user_data_missing" }
    }
  }

  static clearUser () {
    Cookies.deleteCookie('Access-Token');
    Cookies.deleteCookie('Uid');
    Cookies.deleteCookie('Client');
  }


  getURLParameter (name, url) {
    let regex, results;
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[[\]]/g, "\\$&");
    regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


  static verifyUserToken (store) {
    if (Cookies.getCookie('Access-Token')) {
      let params = {
        path: "verify_token",
        path_variables: {
          accessToken: Cookies.getCookie('Access-Token'),
          uid: encodeURIComponent(Cookies.getCookie('Uid')),
          client: Cookies.getCookie('Client')
        },
        user: store.getState().user
      }

      API.do(params).then((result) => {
        if (result) {
          const newData = { token: Cookies.getCookie('Access-Token'), client: Cookies.getCookie('Client') };
          const data = Object.assign(result, newData);

          store.dispatch({
            type: "USER_EDIT",
            value: data
          })

          this.getUserAvatar(store);
        }
      },
      (reject) => {
        Sessions.clearUser();
        store.dispatch({
          type: "USER_LOGOUT",
        })
      });
    }
  }

  static getUserAvatar(store) {
    let params = { 
      path: "get_avatar",
      data: {
        user_id: store.getState().user.id
      }
    };

    API.do(params).then((result) => {
      store.dispatch({
        type: "USER_EDIT",
        value: { avatar_file_name: result.avatar }
      })
    },
    (reject) => {
      
    })
  }
};

export default Sessions;