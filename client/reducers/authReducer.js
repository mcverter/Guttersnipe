import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER
} from '../actions/auth/authActionTypes'

export default function auth(
  auth=initialState.auth, action={}) {
  switch(action.type) {
    case AUTH_ERROR:
      return {...auth, error: action.message};
    case AUTH_USER:
      return {...auth, authenticated: true};
    case UNAUTH_USER:
      return {...auth, authenticated: false}
  }
}
