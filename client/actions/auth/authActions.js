import {AUTH_USER, AUTH_ERROR, UNAUTH_USER} from './authActionTypes';
import {SERVER_URL} from '../../config';
import {browserHistory} from 'react-router';

export function signInUser({email, password}) {
  return function(dispatch) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json')
    const myInit = {
      method: 'POST',
      mode: 'cors',
               headers: headers,
      body:JSON.stringify({
          username: 'user1',
          password: 'password'
        })
    }
    const myRequest = new Request(`${SERVER_URL}/api/signin`, myInit);

   fetch(myRequest)
      .then(response => {
        debugger;
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
        //browserHistory.push('/welcomeUser');
      })
      .catch(response => {
        debugger;
        const errMsg =  response && response.data ? response.data.error : '';
        dispatch (authError('Could not login ' + errMsg));
      });
  };
}

export function signUpUser({email, password}) {
  return function(dispatch) {
    fetch(`${SERVER_URL}/api/auth/signup`,
      {method: 'POST', body: {email, password}})
      .then(response => {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/welcomeUser');
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
