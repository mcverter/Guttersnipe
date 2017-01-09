import {combineReducers} from 'redux';
import shareables from './shareableReducer';

const rootReducer = combineReducers({
  shareables
});

export default rootReducer;
