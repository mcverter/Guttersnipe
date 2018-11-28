import {combineReducers} from "redux";
import sampleReducer from './sampleReducer';

const rootReducer = combineReducers({
  sample: sampleReducer
});

export default rootReducer;
