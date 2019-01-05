import * as types from "../types";


export const fetchAllShareablesRequestAction = () => {
  return {
    type: types.SHAREABLE_LIST_REQUEST
  }
};

export const fetchAllShareablesSuccessAction = (shareables) => {
  return {
    type: types.SHAREABLE_LIST_SUCCESS,
    shareables
  }
}

export const fetchAllShareablesFailureAction = (error) => {
  return {
    type: types.SHAREABLE_LIST_FAILURE,
    error
  }
}
