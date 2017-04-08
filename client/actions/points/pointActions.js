import * as types from "./pointActionTypes";
import {SERVER_URL} from "../../config";
import {browserHistory} from 'react-router';

/* Point List */
export function fetchAllPointsIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    if (! state.points.items || state.points.items.length <= 0) {
      dispatch(pointsAllRequest());
      return fetch(`${SERVER_URL}/api/points`,
        { method: 'GET' })
        .then(response=>response.json())
        .then(json=> {
          dispatch(receiveAllPoints(json));
        });

    }
  };
}

function receiveAllPoints(json) {
  return {
    type: types.POINTS_ALL_REQUEST_SUCCESS,
    points: json
  };
}

function pointsAllRequest() {
  return {
    type: types.POINTS_ALL_REQUEST
  };
}
