import * as types from "../types";

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
