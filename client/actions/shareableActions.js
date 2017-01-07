
import 'whatwg-fetch'
export const FETCH_SHAREABLE_V2_S = 'FETCH_SHAREABLE_V2_S';
export const CREATE_SHAREABLE_V2_ = 'CREATE_SHAREABLE_V2_';
export const FETCH_SHAREABLE_V2_ = 'FETCH_SHAREABLE_V2_';
export const DELETE_SHAREABLE_V2_ = 'DELETE_SHAREABLE_V2_';

const ROOT_URL = 'http://localhost:5000';

export function fetchShareable_v2_s() {
  const request = fetch.get(`${ROOT_URL}/shareables`);

  return {
    type: FETCH_SHAREABLE_V2_S,
    payload: request
  };
}
/*
export function createShareable(props) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

  return {
    type: CREATE_Shareable,
    payload: request
  };
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


*/

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
      fetchShareable_v2_s();
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

