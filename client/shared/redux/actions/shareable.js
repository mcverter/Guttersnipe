import * as types from "../types";
import find from "lodash.find";
// import { SERVER_URL } from "../../config/api";
let SERVER_URL = "http:/localhost:3000";
// import fetch from "isomorphic-fetch";
function applyGeographicalFilter() {}
function applyCategoryFilter(){}
function applySubcategoryFilter(){}
let filters = [applyCategoryFilter, applyGeographicalFilter, applySubcategoryFilter]
export function getFilteredShareables(allShareables) {
  let filtered = allShareables;
  filters.forEach(ffn => {
    filtered = ffn.apply(null, filtered)
  });
  return filtered;
}

export function* currentShareablesSaga() {
  console.log("Hello World");

  const response = yield call(fetch, `${SERVER_URL}/api/shareables`);
  const data = yield apply(response, response.json);
  yield put(setCurrentUser(data));

  console.log(data);
}

function receiveAllShareables(json) {
  return {
    type: types.SHAREABLES_ALL_REQUEST_SUCCESS,
    shareables: json
  };
}

function setCurrentShareable(id) {
  return {
    type: types.SHAREABLES_SET_CURRENT,
    selectedIndex: parseInt(id)
  };
}

function shouldFetchSingleShareable(state, id) {
  return !(
    state.shareables ||
    !state.shareables.items ||
    find(state.shareables.items, { id: parseInt(id) })
  );
}

export function fetchSingleShareableIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchSingleShareable(getState(), id)) {
      return dispatch(fetchSingleShareable(id));
    } else {
      return dispatch(setCurrentShareable(id));
    }
  };
}

function fetchSingleShareable(id) {
  return function(dispatch) {
    dispatch(requestSingleShareable(id));

    return fetch(`${SERVER_URL}/shareable/${id}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSingleShareable(json)));
  };
}
function requestSingleShareable() {
  return {
    type: types.SHAREABLE_SINGLE_REQUEST
  };
}

function receiveSingleShareable(json) {
  return {
    type: types.SHAREABLE_SINGLE_REQUEST_SUCCESS,
    shareables: json
  };
}
