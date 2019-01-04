import {call, put, takeLatest} from 'redux-saga/effects'
import {fetchAllShareablesSuccessAction, fetchAllShareablesFailureAction} from '../actions/shareables';
import * as types from "../types";
let SERVER_URL = "http:/localhost:3000";
import fetch from "isomorphic-fetch";


function* shareableFetchWorkerSaga (action){
  try {
    const response = yield call(fetch, `${SERVER_URL}/api/shareables`);
    const data = yield apply(response, response.json);
    yield put(fetchAllShareablesSuccessAction(data));
  } catch (error) {
    yield put(fetchAllShareablesFailureAction())
  }
}

function* shareableFetchWatcherSaga (){
  yield takeLatest(types.SHAREABLE_LIST_REQUEST,shareableFetchWorkerSaga);
}

export default function* rootSaga(){
  yield all([
    shareableFetchWatcherSaga(),
  ])
}


/*
let SERVER_URL = "http:/localhost:3000";

import fetch from "isomorphic-fetch";
export function* currentShareablesSaga() {
  console.log("Hello World");

  const response = yield call(fetch, `${SERVER_URL}/api/shareables`);
  const data = yield apply(response, response.json);
  yield put(setCurrentUser(data));

  console.log(data);
}

*/
