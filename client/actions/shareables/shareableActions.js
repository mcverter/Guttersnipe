import * as types from "./shareableActionTypes";
import _ from "lodash";
import {SERVER_URL} from "../../config";
import {browserHistory} from 'react-router';

function shareableSearchRequest() {
  return {
    type: types.SHAREABLES_SEARCH_REQUEST
  };
}

export function searchShareables(params={}){
  return dispatch => {
    dispatch(shareableSearchRequest());
    return fetch(`${SERVER_URL}/api/shareables/search`,
      { method: 'POST', body: JSON.stringify(params) })
      .then(response=>response.json())
      .then(json=> {
        dispatch(receiveAllShareables(json));
        browserHistory.push('/shareables')
      });
  };
}

function fetchAllShareables() {
  return dispatch => {
    console.log('fetching all')
    dispatch(requestAllShareables());
    return fetch(`${SERVER_URL}/api/shareables`)
      .then(response => response.json())
      .then(json => dispatch(receiveAllShareables(json)));
  };
}

function requestAllShareables() {
  return {
    type: types.SHAREABLES_ALL_REQUEST
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


function receiveAllShareables(json) {
  return {
    type: types.SHAREABLES_ALL_REQUEST_SUCCESS,
    shareables: json
  };
}

function shouldFetchSingleShareable(state, id) {
  if(!state.shareables || !state.shareables.items ||
    _.find(state.shareables.items, {id: parseInt(id)})) {
    return false;
  }
  return true;
}

function setCurrentShareable(id) {
  return {
    type: types.SHAREABLES_SET_CURRENT,
    selectedIndex: parseInt(id)
  };
}

export function fetchAllShareablesIfNeeded(forceFetch=false) {
  return (dispatch, getState) => {
    console.log('fetch if needed');
    if (forceFetch || !getState().shareables.items || getState().shareables.items.length <= 0) {
      return (dispatch(fetchAllShareables()));
    }
  }
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

function fetchSingleShareable(id) {
  return function (dispatch) {
    dispatch(requestSingleShareable(id));

    return fetch(`${SERVER_URL}/api/shareable/${id}`)
      .then(response=>response.json())
      .then(json=>
        dispatch(receiveSingleShareable(json)));
  };
}



export function createShareable(data) {
  fetch(`${SERVER_URL}/api/shareables`, { method: 'POST', body: JSON.stringify(data) });
}


export function fetchShareableCategorizations() {
  return (dispatch, getState) => {
    const shareableState = getState().shareables;
    if (!shareableState.categorizationMeta ||
      !shareableState.categorizationMeta.types) {
      dispatch({type: types.SHAREABLE_CATEGORIZATION_REQUEST});
      return fetch(`${SERVER_URL}/api/shareables/categorization`)
        .then(response => response.json())
        .then(json => dispatch(receiveShareableCategorization(json)));
    }
    ;
  }
}

function receiveShareableCategorization(json) {
  return {
    type: types.SHAREABLE_CATEGORIZATIONS_SUCCESS,
    categorizationMeta: json
  };
}
