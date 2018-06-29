import * as types from '../types';
import {SERVER_URL} from '../../config/api';


export function fetchRandomKropotkin() {
  return dispatch => {
    dispatch( {type: types.KROPOTKIN_SINGLE_REQUEST});
    return fetch(`${SERVER_URL}/kropotkin`)
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
