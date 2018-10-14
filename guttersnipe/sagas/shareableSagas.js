const API_ENDPOINT = '';

const getShareables = (state) => state.shareables;

function * fetchShareablesList() {
  const raw = yield fetch(`${API_ENDPOINT}/getShareables`);
  const json = yield raw.json();
  const shareables = json.items[0];
  yield put({type: 'FETCHED_SHAREABLES', shareables});
}

function * setShareable(id){
  let shareables = yield select(getShareables)

  if (! shareables(id)) {
    shareables[id] = yield fetchSingleShareable(id);
    yield put({type: 'FETCHED_SHAREABLES', shareables});
  }
  yield put({type: 'SHAREABLE_SELECTED', id});
}

function setShareable(id) {

}
