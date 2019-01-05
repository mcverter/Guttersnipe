import * as types from "../types";
import fetch from "isomorphic-fetch";
import {call, put, takeLatest, apply, all} from 'redux-saga/effects'
import {
  fetchAllShareablesSuccessAction,
  fetchAllShareablesFailureAction
} from '../actions/shareables';
let SERVER_URL = "http://localhost:5000";


function* shareableFetchWorkerSaga (action){
  try {
    const response = yield call(fetch, `${SERVER_URL}/api/shareables`);
    const json = yield apply(response, response.json);
    yield put(fetchAllShareablesSuccessAction(json.data));
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
