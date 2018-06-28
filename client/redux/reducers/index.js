import { combineReducers } from 'redux';
import shareables from './shareable';
import kropotkin from './kropotkin';
import auth from './auth';
import location from './location';

const rootReducer = combineReducers({
  auth,
  location,
  shareables,
  kropotkin,
});

export default rootReducer;
