import * as types from "./shareableActionTypes";
import _ from "lodash";
import {SERVER_URL} from './../../config';

/* Single Shareable */
function setCurrentShareable(id) {
  return {
    type: types.SHAREABLES_SET_CURRENT,
    selectedIndex: parseInt(id)
  };
}

function shouldFetchSingleShareable(state, id) {
  if(!state.shareables || !state.shareables.items ||
    _.find(state.shareables.items, {id: parseInt(id)})) {
    return false;
  }
  return true;
}

export function fetchSingleShareableIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchSingleShareable(getState(), id)){
      return dispatch(fetchSingleShareable(id));
    } else {
      return dispatch(setCurrentShareable(id));
    }
  };
}

export function fetchSingleShareable(id) {
  return dispatch => {
      dispatch(requestSingleShareable(id));
      return fetch(`${SERVER_URL}/shareables`)
        .then(response => {
          console.log(response);
          return response.json()
        })
        .then(json => {
          console.log(json);
          return dispatch(receiveSingleShareable(json))
        });
    }
}

function receiveSingleShareable(json) {
  return {
    type: types.SHAREABLE_SINGLE_REQUEST_SUCCESS,
    shareables: json
  };
}

function requestSingleShareable() {
  return {
    type: types.SHAREABLE_SINGLE_REQUEST
  };
}


/* Shareable List */
function fetchAllShareablesIfNeeded(forceFetch=false, page_num=1) {
  return (dispatch, getState) => {
    const state = getState();
    if (forceFetch || ! state.shareables.items || state.shareables.items.length <= 0) {
      return dispatch(searchShareablesWithParametersAndPagination({page_num: 1}));
    }
  };
}

function receiveAllShareables(json) {
  return {
    type: types.SHAREABLES_ALL_REQUEST_SUCCESS,
    shareables: json
  };
}

function shareableSearchRequest() {
  return {
    type: types.SHAREABLES_SEARCH_REQUEST
  };
}

function saveSeharchParams(searchParams) {
  return {
    type: types.SAVE_SEARCH_PARAMS,
    searchParams: searchParams
  };
}
 function searchShareablesWithParametersAndPagination(options){
  let {forceFetch, page_num, pageSize, searchParams}=options;
  forceFetch = forceFetch || false;
  page_num = page_num || 1;
  pageSize = pageSize || 20;
  searchParams = searchParams || {};
  return dispatch => {
    dispatch(shareableSearchRequest());
    dispatch(saveSearchParams(searchParams));
    return fetch(`${SERVER_URL}/api/shareables/search`,
      { method: 'POST', body: JSON.stringify({
        search_params:searchParams,
        page_num: page_num,
        page_size: pageSize
      }) })
      .then(response=>response.json())
      .then(json=> {
        dispatch(receiveAllShareables(json));
//        browserHistory.push('/shareables');
      });
  };
}

/* Create Shareable */
function createShareable(data) {
  fetch(`${SERVER_URL}/api/shareables`, { method: 'POST', body: JSON.stringify(data) });
}

/* Shareable Categorization */
function fetchShareableCategorizations() {
  return (dispatch, getState) => {
    const shareableState = getState().shareables;
    if (!shareableState.categorizationMeta ||
      !shareableState.categorizationMeta.types) {
      dispatch({type: types.SHAREABLE_CATEGORIZATION_REQUEST});
      return fetch(`${SERVER_URL}/api/shareables/categorization`)
        .then(response => response.json())
        .then(json => dispatch(receiveShareableCategorization(json)));
    }
  };
}

function receiveShareableCategorization(json) {
  return {
    type: types.SHAREABLE_CATEGORIZATIONS_SUCCESS,
    categorizationMeta: json
  }
}