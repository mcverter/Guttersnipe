import * as types from "../types";
import fetch from "isomorphic-fetch";
import {call, put, takeLatest, apply, all} from 'redux-saga/effects'
import {
  fetchAllShareablesSuccessAction,
  fetchAllShareablesFailureAction,
  fetchCategoriesSuccessAction,
  fetchCategoriesFailureAction
} from '../actions/shareables';
let SERVER_URL = "http://localhost:5000";

function* categoriesFetchWorkerSaga (action) {
  try {
    const response = yield call(fetch, `${SERVER_URL}/api/shareables/categories`);
    const json = yield apply(response, response.json);
    console.log('categories fetch data', json.data);
    yield put(fetchCategoriesSuccessAction(json.data));
  } catch (error) {
    yield put(fetchCategoriesFailureAction(error));
  }
}

function* shareableFetchWorkerSaga (action){
  try {
    const response = yield call(fetch, `${SERVER_URL}/api/shareables`);
    const json = yield apply(response, response.json);
    console.log('shareable fetch data', json.data);
    yield put(fetchAllShareablesSuccessAction(json.data));
  } catch (error) {
    yield put(fetchAllShareablesFailureAction(error));
  }
}

function* shareableFetchWatcherSaga (){
  yield takeLatest(types.SHAREABLE_LIST_REQUEST, shareableFetchWorkerSaga);
}

function* categoriesFetchWatcherSaga(){
  yield takeLatest(types.CATEGORIES_REQUEST, categoriesFetchWorkerSaga);
}

export default function* rootSaga(){
  yield all([
    shareableFetchWatcherSaga(),
    categoriesFetchWatcherSaga()
  ])
}
