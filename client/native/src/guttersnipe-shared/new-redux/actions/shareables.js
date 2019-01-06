import * as types from "../types";

export const fetchCategoriesRequestAction = () => {
  return {
    type: types.CATEGORIES_REQUEST
  }
};

export const fetchCategoriesSuccessAction = (categories) => {
  return {
    type: types.CATEGORIES_SUCCESS,
    categories
  }
}

export const fetchCategoriesFailureAction = (error) => {
  return {
    type: types.CATEGORIES_FAILURE,
    error
  }
}

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
