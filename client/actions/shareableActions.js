import * as types from './actionTypes';

const ROOT_URL = 'http://localhost:5000';

export function fetchAllShareables() {
    return dispatch => {
        dispatch(requestAllShareables());
        return fetch(`${ROOT_URL}/shareables`)
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
    return true
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

        return fetch(`${ROOT_URL}/shareable/${id}`)
            .then(response=>response.json())
            .then(json=>
                dispatch(receiveSingleShareable(json)));
    };
}



export function createShareable(data) {
    fetch(`${ROOT_URL}/shareables`, { method: 'POST', body: JSON.stringify(data) });
}
