import * as types from './kropotkinActionTypes';
import {SERVER_URL} from '../../config';


export function fetchRandomKropotkin() {
  return dispatch => {
    dispatch( {type: types.KROPOTKIN_SINGLE_REQUEST});
    return fetch(`${SERVER_URL}/api/kropotkin`)
      .then(response => response.json())
      .then(json => dispatch(receiveKropotkin(json)));
  };
}

function receiveKropotkin(json) {
  return {
    type: types.KROPOTKIN_SINGLE_REQUEST_SUCCESS,
    kropotkin: json
  };
}
