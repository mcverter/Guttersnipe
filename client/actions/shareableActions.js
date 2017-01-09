import {SHAREABLES_ALL_REQUEST, SHAREABLES_ALL_REQUEST_SUCCESS,
    SHAREABLES_ALL_REQUEST_ERROR} from './actionTypes'

const ROOT_URL = 'http://localhost:5000';

export function fetchAllShareables() {
  return dispatch => {
    dispatch(requestAllShareables())
    return fetch(`${ROOT_URL}/shareables`)
      .then(response => response.json())
      .then(json => dispatch(receiveAllShareables(json)))
  }
}

function requestAllShareables() {
    return {
        type: SHAREABLES_ALL_REQUEST
    }
}


function receiveAllShareables(json) {
    return {
        type: SHAREABLES_ALL_REQUEST_SUCCESS,
        shareables: json
    }
}


const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit))
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
}


/*
}

export function fetchShareable(id) {
  const request = axios.get(`${ROOT_URL}/shareables/${id}${API_KEY}`);

  return {
    type: FETCH_Shareable,
    payload: request
  };
}

export function deleteShareable(id) {
  const request = axios.delete(`${ROOT_URL}/shareables/${id}${API_KEY}`);

  return {
    type: DELETE_Shareable,
    payload: request
  };
}




// CORY-HOUSE INSPIRED.
import shareableApi from '../api/mockShareableApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import * as types from './actionTypes';


// CORY HOUSE INSPIRED
export function loadShareablesSuccess(shareables) {
  return { type: types.LOAD_SHAREABLES_SUCCESS, shareables};
}

export function createShareableSuccess(shareable) {
  return {type: types.CREATE_SHAREABLE_SUCCESS, shareable};
}

export function updateShareableSuccess(shareable) {
  return {type: types.UPDATE_SHAREABLE_SUCCESS, shareable};
}

export function loadShareables() {
  return function(dispatch) {
      fetchShareables();
    dispatch(beginAjaxCall());
    return shareableApi.getAllShareables().then(shareables => {
      dispatch(loadShareablesSuccess(shareables));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveShareable(shareable) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return shareableApi.saveShareable(shareable).then(shareable => {
      shareable.id ? dispatch(updateShareableSuccess(shareable)) :
        dispatch(createShareableSuccess(shareable));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

*/