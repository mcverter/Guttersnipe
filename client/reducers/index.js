import {combineReducers} from 'redux';
import shareables from './shareableReducer';
import {reducer as form} from 'redux-form';
import auth from './authReducer';
import browserEnv from './browserEnvReducer';
import kropotkin from './kropotkinReducer';
import points from './pointsReducer';

const rootReducer = combineReducers({
  shareables,
  auth,
  form,
  browserEnv,
  kropotkin,
  points
});

export default rootReducer;
