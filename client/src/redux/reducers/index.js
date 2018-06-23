import { combineReducers } from 'redux';
import shareables from './shareable';
import kropotkin from './kropotkin';
 import auth from './authReducer';
// import browserEnv from './browserEnvReducer';

const rootReducer = combineReducers({
  auth,
  browserEnv,
  shareables,
  kropotkin
});

export default rootReducer;
