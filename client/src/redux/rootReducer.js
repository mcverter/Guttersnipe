import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { user } from './reducers/user';
import { registry } from './reducers/registry';
import { Store } from './IStore';

const { reducer } = require('redux-connect');

const rootReducer: Redux.Reducer<Store> = combineReducers<Store>({
  // user,
  registry,
//  routing: routerReducer,
  reduxAsyncConnect: reducer,
});

export default rootReducer;
