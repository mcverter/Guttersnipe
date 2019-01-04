import * as types from "../types";
import fetch from "isomorphic-fetch";
import {call, put, takeLatest} from 'redux-saga/effects'
import {
  fetchAllShareablesSuccessAction,
  fetchAllShareablesFailureAction
} from '../actions/shareables';
let SERVER_URL = "http:/localhost:3000";


function* shareableFetchWorkerSaga (action){
  try {
    const response = yield call(fetch, `${SERVER_URL}/api/shareables`);
    const data = yield apply(response, response.json);
    yield put(fetchAllShareablesSuccessAction(data));
  } catch (error) {
    yield put(fetchAllShareablesFailureAction(error));
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
