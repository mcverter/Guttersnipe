export helloSaga from "./helloworld";
export fetchShareables from "./shareablesSaga";

import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import config from "../config";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  console.log("worker saga is working");
  try {
    const response = yield call(fetchDog);
    console.log("foo", foo, "server", SERVER_URL);
    console.log("a", response);
    const dog = response.data.message;
    console.log("b");
    // dispatch a success action to the store with the new dog
    yield put({ type: "API_CALL_SUCCESS", dog });
    console.log("dog", dog);
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
