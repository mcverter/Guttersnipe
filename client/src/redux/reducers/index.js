import { combineReducers } from 'redux';
import shareables from './shareable';
import kropotkin from './kropotkin';
 import auth from './authReducer';
// import location from './locationReducer';

const rootReducer = combineReducers({
  auth,
  location,
  shareables,
  kropotkin
});

export default rootReducer;
