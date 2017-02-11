import {combineReducers} from 'redux';
import shareables from './shareableReducer';
import {reducer as form} from 'redux-form';
import auth from './authReducer';
import browserEnv from './browserEnvReducer'

const rootReducer = combineReducers({
  shareables,
  auth,
  form,
  browserEnv
});

export default rootReducer;
