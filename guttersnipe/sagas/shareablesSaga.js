import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import * as types from "../redux/types";
import { SERVER_URL } from "../config";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* shareableListSaga() {
  yield takeLatest(types.SHAREABLE_LIST_REQUEST, shareableFetchSaga);
}

// function that makes the api request and returns a Promise for response
function fetchShareables() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

// worker saga: makes th"API_CALL_SUCCESS"e api call when watcher saga sees the action
function* shareableFetchSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    // dispatch a success action to the store with the new dog
    yield put({ type: types.SHAREABLE_LIST_SUCCESS, dog });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.SHAREABLE_LIST_FAILURE, error });
  }
}
