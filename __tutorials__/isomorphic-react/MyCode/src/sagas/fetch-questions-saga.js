import { take, put } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

export default function * () {
  while (true) {
    yield take('REQUEST_FETCH_QUESTIONS');
    const raw = yield fetch('/api/questions');
    const json = yield raw.json();
    const questions = json.items;
    yield put({type: 'FETCHED_QUESTIONS', questions});
  }
}
