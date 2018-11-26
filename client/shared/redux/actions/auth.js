import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from "../types";
import { SERVER_URL } from "../../config/api";

export function signInUser({ email, password }) {
  return function(dispatch) {
    fetch(`${SERVER_URL}/api/signin`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ username: email, password: password })
    })
      .then(response => {
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else if (response.status === 401) {
          return response.json().then(data => {
            throw data.msg;
          });
        } else {
          throw "Could not login " +
            response.status +
            " " +
            response.statusText;
        }
      })
      .then(data => {
        localStorage.setItem("token", data.access_token);
        dispatch({ type: AUTH_USER, username: data.username });
        //     browserHistory.push('/welcome');
      })
      .catch(errorMsg => {
        dispatch(authError(errorMsg));
      });
  };
}

export function signUpUser({ email, password }) {
  return function(dispatch) {
    fetch(`${SERVER_URL}/api/signup`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ username: email, password: password })
    })
      .then(response => {
        if (response.status >= 200 && response.status <= 300) {
          return response.json();
        } else if (response.status === 401) {
          return response.json().then(data => {
            throw data.msg;
          });
        } else {
          throw "Could not login " +
            response.status +
            " " +
            response.statusText;
        }
      })
      .then(data => {
        localStorage.setItem("token", data.access_token);
        dispatch({ type: AUTH_USER, username: data.username });
        // browserHistory.push('/welcome');
      })
      .catch(errorMsg => {
        dispatch(authError(errorMsg));
      });
  };
}

export function authError(errorMsg) {
  return { type: AUTH_ERROR, action: errorMsg };
}

export function signOutUser() {
  localStorage.removeItem("token");
  return { type: UNAUTH_USER };
}


