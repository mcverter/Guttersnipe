import { combineReducers } from 'redux';
import shareables from './reducers/shareable';
import kropotkin from './reducers/kropotkin';
// import auth from './authReducer';
// import browserEnv from './browserEnvReducer';

const rootReducer = combineReducers({
//  auth,
//  browserEnv,
  shareables,
  kropotkin
});

export default rootReducer;
