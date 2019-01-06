import * as types from "../types";

function receiveAllShareables(json) {
  return {
    type: types.SHAREABLES_ALL_REQUEST_SUCCESS,
    shareables: json
  };
}

function fetchSingleShareable(id) {
  return {
    type: types.FETCH_SINGLE_SHAREABLE,
    selectedIndex: parseInt(id)
  };
}

function setCurrentShareable(id) {
  return {
    type: types.SHAREABLES_SET_CURRENT,
    selectedIndex: parseInt(id)
  };
}



