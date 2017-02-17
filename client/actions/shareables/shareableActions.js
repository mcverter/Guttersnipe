import * as types from './shareableActionTypes';
import _ from 'lodash';
import {SERVER_URL} from '../../config';


export function searchShareables(searchvals){

  return function(dispatch) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    const myInit = {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body:JSON.stringify({})
    };
    const myRequest = new Request(`${SERVER_URL}/api/shareables/search`, myInit);

/*    fetch(myRequest)
      .then(response => {
        if (response.status === 200) {
          response.json().then(function (data) {
            console.log(data);
            localStorage.setItem('token', data.access_token);
            dispatch({type: AUTH_USER});
            browserHistory.push('/welcome');
          })
        }
        else {
          const status = response.status;
          const statusText = response.statusText;
          response.json().then(function (data) {
            dispatch(authError
            ('Could not login ' + status + " " + statusText + ": " + data.msg));
          })
            .catch(() => {
              dispatch(authError
              ('Could not login ' + status + " " + statusText));

            })
        }
      })

      .catch(response => {
        const errMsg =  response && response.data ? response.data.error : response;
        dispatch (authError('Could not login ' + errMsg));
      }); */
  };
}

function receiveSearchResults() {

}


export function fetchAllShareables() {
    return dispatch => {
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
    return dispatch => {
        dispatch( {type: types.SHAREABLE_CATEGORIZATION_REQUEST});
        return fetch(`${SERVER_URL}/api/shareables/categorization`)
            .then(response => response.json())
            .then(json => dispatch(receiveShareableCategorization(json)));
    };
}

function receiveShareableCategorization(json) {
    return {
        type: types.SHAREABLE_CATEGORIZATIONS_SUCCESS,
        categorizationMeta: json
    };
}
