import * as actionTypes from '../actionTypes/shareables';
import { get, post, del } from '../utils/api';

export function addShareable() {
  return async dispatch => {
    dispatch({
      type: actionTypes.ADD_SHAREABLE
    });

    try {
      const result = await post('/api/shareables');

      dispatch({
        type: actionTypes.ADD_SHAREABLE_SUCCESS,
        shareable: result
      });
    } catch(e) {
      dispatch({
        type: actionTypes.ADD_SHAREABLE_ERROR
      });
    }
  }
}

export function requestShareables() {
  return async dispatch => {
    dispatch({
      type: actionTypes.REQUEST_SHAREABLES
    });

    try {
      const result = await get('/api/shareables');

      dispatch({
        type: actionTypes.REQUEST_SHAREABLES_SUCCESS,
        shareables: result
      });
    } catch(e) {
      dispatch({
        type: actionTypes.REQUEST_SHAREABLES_ERROR
      });
    }
  }
}

export function deleteShareable(shareableId) {
  return async dispatch => {
    dispatch({
      type: actionTypes.DELETE_SHAREABLE,
      shareableId
    });

    try {
      await del(`/api/shareables/${shareableId}`);

      dispatch({
        type: actionTypes.DELETE_SHAREABLE_SUCCESS,
        shareableId
      });
    } catch(e) {
      dispatch({
        type: actionTypes.DELETE_SHAREABLE_ERROR,
        shareableId
      });
    }
  }
}
