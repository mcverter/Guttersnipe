import {takeEvery,delay} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import {asyncTestInitial,asyncTestSaga,asyncFetchInitial,
  asyncFetchSuccess,asyncFetchError} from '../actions/middlewareActions'


export function ShareableFetchAll(){
  return fetch('testdata.json')
    .then((res)=> res.json())
    .then((jsondata)=> {
      const {dummyOutput} = jsondata.dummy
      return dummyOutput
    })
}

export  function* shareableFetchSaga (action){
  yield call(delay,1000)
  yield put(asyncFetchInitial())
  try {
    const dummyOutput = yield call(FetchTestData)
    yield put(asyncFetchSuccess(dummyOutput))
  } catch (error) {
    console.log("Error in fetch" + error)
    yield put(asyncFetchError())
  }
}


export default function* shareableFetchWatcher (){
  yield takeEvery("ASYNC_TEST_SAGA",fetchAsyncSaga)
}
