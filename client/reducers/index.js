import {combineReducers} from 'redux';
import shareables from './shareableReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  shareables,
    form: formReducer
});

export default rootReducer;
