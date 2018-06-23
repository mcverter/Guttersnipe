import {combineReducers} from 'redux';
import shareables from './shareableReducer';
import {reducer as form} from 'redux-form';
import auth from './authReducer';
import browserEnv from './browserEnvReducer';
import kropotkin from './kropotkinReducer';

const rootReducer = combineReducers({
  shareables,
  auth,
  form,
  browserEnv,
  kropotkin
});

export default rootReducer;
