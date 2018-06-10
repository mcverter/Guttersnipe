import * as types from './kropotkinActionTypes';
import {SERVER_URL} from './../../config';


export function fetchKropotkin() {
    return dispatch => {
        dispatch( {type: types.KROPOTKIN_SINGLE_REQUEST});
        return fetch(`${SERVER_URL}/kropotkins`)
            .then(response => response.json())
            .then(json => {
              console.log(json);
              dispatch(receiveKropotkin(json))
            });
    };
}

function receiveKropotkin(json) {
    return {
        type: types.KROPOTKIN_SINGLE_REQUEST_SUCCESS,
        kropotkin: json
    };
}
