import {combineReducers} from 'redux';
import shareables from './shareableReducer.js';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  shareables,
  ajaxCallsInProgress
});

export default rootReducer;
