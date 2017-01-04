import * as types from './actionTypes';
import shareableApi from '../api/mockShareableApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

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