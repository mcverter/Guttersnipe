import {combineReducers} from 'redux';
import shareables from './shareableReducer';
import {reducer as form} from 'redux-form';
import auth from './authReducer';

const rootReducer = combineReducers({
  shareables,
  auth,
  form,
});

export default rootReducer;
