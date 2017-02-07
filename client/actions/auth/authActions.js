import {AUTH_USER, AUTH_ERROR, UNAUTH_USER} from './authActionTypes';
import {SERVER_URL} from '../../config';
import {browserHistory} from 'react-router';

export function signInUser({email, password}) {
  return function(dispatch) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    const myInit = {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body:JSON.stringify({
        username: email,
        password: password
      })
    };
    const myRequest = new Request(`${SERVER_URL}/api/signin`, myInit);

    fetch(myRequest)
      .then(response => {
        response.json().then(function(data) {
          console.log(data);
          localStorage.setItem('token', data.access_token);
          dispatch({type: AUTH_USER});
          browserHistory.push('/welcome');
        })
          .catch(response => {
            const errMsg =  response && response.data ? response.data.error : response;
            dispatch (authError('Could not login ' + errMsg));
          })
      })
      .catch(response => {
        const errMsg =  response && response.data ? response.data.error : response;
        dispatch (authError('Could not login ' + errMsg));
      });
  };
}

export function signUpUser({email, password}) {
  return function(dispatch) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    const myInit = {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body:JSON.stringify({
        username: email,
        password: password
      })
    };
    const myRequest = new Request(`${SERVER_URL}/api/signup`, myInit);
    debugger;
    fetch(myRequest)
      .then(response => {
        response.json().then(function(data) {
          console.log(data);
          localStorage.setItem('token', data.access_token);
          dispatch({type: AUTH_USER});
          browserHistory.push('/welcome');
        })
          .catch(response => {
            const errMsg =  response && response.data ? response.data.error : response;
            dispatch (authError('Could not login ' + errMsg));
          })
      })
      .catch(response => {
        const errMsg =  response && response.data ? response.data.error : '';
        dispatch (authError('Could not login ' + errMsg));
      });
  };
}

export function authError(errorMsg) {
  return {type: AUTH_ERROR, action: errorMsg};
}


export function signOutUser() {
  localStorage.removeItem('token');
  return {type: UNAUTH_USER};
}
