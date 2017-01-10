import {SHAREABLES_ALL_REQUEST, SHAREABLES_ALL_REQUEST_SUCCESS,
    SHAREABLES_ALL_REQUEST_ERROR} from './actionTypes';

const ROOT_URL = 'http://localhost:5000';

export function fetchAllShareables() {
  return dispatch => {
    dispatch(requestAllShareables())
    return fetch(`${ROOT_URL}/shareables`)
      .then(response => response.json())
      .then(json => dispatch(receiveAllShareables(json)));
  };
}

function requestAllShareables() {
    return {
        type: SHAREABLES_ALL_REQUEST
    };
}


function receiveAllShareables(json) {
    return {
        type: SHAREABLES_ALL_REQUEST_SUCCESS,
        shareables: json
    };
}