import {
  STORE_BROWSER_LOCATION
} from '../actions/browserEnv/browserEnvActionTypes';
import initialState from './initialState';

export default function browserEnv(
  browserEnv=initialState.browserEnv, action={}) {
  switch(action.type) {
    case STORE_BROWSER_LOCATION:
      debugger;
      return {...browserEnv, location: action.location};
    default:
      return browserEnv;
  }
}
