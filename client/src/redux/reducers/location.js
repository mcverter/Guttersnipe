import {
  STORE_BROWSER_LOCATION
} from '../actions/location/locationActionTypes';
import initialState from './initialState';

export default function location(
  location=initialState.location, action={}) {
  switch(action.type) {
    case STORE_BROWSER_LOCATION:
      return {...location, location: action.location};
    default:
      return location;
  }
}
