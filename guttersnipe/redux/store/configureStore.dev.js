import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  console.log('initial state', initialState);

  return createStore(
    rootReducer,
    initialState.default,
    composeEnhancers(
      applyMiddleware(thunk))
  )



//
/*  TODO:  InitialState must match rootReducer
initialState,
     composeEnhancers(
      applyMiddleware(thunk, reduxImmutableStateInvariant(),
        logger))
  );
  */
}
